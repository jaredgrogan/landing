// Constants and DOM elements
const dateTimeElement = document.getElementById('dateTime');
const dayNightElement = document.getElementById('dayNight');
const body = document.body;

// Update date and time
const updateDateTime = () => {
    const now = new Date();
    const timeOptions = {
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const timeStr = now.toLocaleTimeString('en-US', timeOptions);
    dateTimeElement.textContent = timeStr;
};

setInterval(updateDateTime, 1000);
updateDateTime();

// Dark mode toggle
dayNightElement.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = dayNightElement.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('lucide-sun');
        icon.classList.add('lucide-moon');
    } else {
        icon.classList.remove('lucide-moon');
        icon.classList.add('lucide-sun');
    }
});

// Google Sign-In
function initGoogleSignIn() {
    google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your actual Google Client ID
        callback: handleGoogleSignIn
    });
    google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large" }
    );
}

function handleGoogleSignIn(response) {
    fetch('/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('userToken', data.token);
            window.location.href = '/dashboard';
        } else {
            console.error('Google Sign-In failed:', data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Apple Sign-In
function initAppleSignIn() {
    AppleID.auth.init({
        clientId: 'YOUR_APPLE_CLIENT_ID', // Replace with your actual Apple Client ID
        scope: 'name email',
        redirectURI: 'https://your-redirect-uri.com/auth/apple-callback', // Replace with your actual redirect URI
        state: 'YOUR_STATE_STRING' // Replace with a unique state string for CSRF protection
    });
}

document.addEventListener('AppleIDSignInOnSuccess', (event) => {
    handleAppleSignIn(event.detail.authorization);
});

document.addEventListener('AppleIDSignInOnFailure', (event) => {
    console.error('Apple Sign-In failed:', event.detail.error);
});

function handleAppleSignIn(authorization) {
    fetch('/auth/apple', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            identityToken: authorization.id_token,
            authorizationCode: authorization.code
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('userToken', data.token);
            window.location.href = '/dashboard';
        } else {
            console.error('Apple Sign-In failed:', data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Meta (Facebook) Sign-In
function initMetaSignIn() {
    FB.init({
        appId: 'YOUR_META_APP_ID', // Replace with your actual Meta App ID
        cookie: true,
        xfbml: true,
        version: 'v13.0'
    });

    document.getElementById('meta-signin-button').addEventListener('click', function(e) {
        e.preventDefault();
        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome! Fetching your information...');
                FB.api('/me', {fields: 'name, email'}, function(response) {
                    handleMetaSignIn(response);
                });
            } else {
                console.error('Meta Sign-In failed: User cancelled login or did not fully authorize.');
            }
        }, {scope: 'public_profile,email'});
    });
}

function handleMetaSignIn(userData) {
    fetch('/auth/meta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('userToken', data.token);
            window.location.href = '/dashboard';
        } else {
            console.error('Meta Sign-In failed:', data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// X (Twitter) Sign-In
function initXSignIn() {
    const xSignInButton = document.getElementById('x-signin-button');
    xSignInButton.addEventListener('click', function(e) {
        e.preventDefault();
        // Open a popup window for X authentication
        const width = 600, height = 600;
        const left = (screen.width / 2) - (width / 2);
        const top = (screen.height / 2) - (height / 2);
        const authWindow = window.open(
            '/auth/x', 
            'xAuth',
            `width=${width},height=${height},left=${left},top=${top}`
        );
        
        // Listen for messages from the popup window
        window.addEventListener('message', function(event) {
            if (event.origin !== window.location.origin) return;
            if (event.data.type === 'X_AUTH_SUCCESS') {
                handleXSignIn(event.data.token);
                authWindow.close();
            }
        }, false);
    });
}

function handleXSignIn(token) {
    fetch('/auth/x/callback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('userToken', data.token);
            window.location.href = '/dashboard';
        } else {
            console.error('X Sign-In failed:', data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Plan selection
function handlePlanSelection(plan) {
    if (isAuthenticated()) {
        fetch('/api/select-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getUserToken()
            },
            body: JSON.stringify({ plan: plan })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Plan selected:', plan);
                window.location.href = '/dashboard';
            } else {
                console.error('Plan selection failed:', data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Please sign in to select a plan');
    }
}

// Helper functions
function isAuthenticated() {
    return !!localStorage.getItem('userToken');
}

function getUserToken() {
    return localStorage.getItem('userToken');
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  updateGoogleButton();
}

function updateGoogleButton() {
  const googleButton = document.getElementById('googleSignInButton');
  if (document.body.classList.contains('dark-mode')) {
    googleButton.style.backgroundColor = '#333';
    // Change to dark mode Google logo
    googleButton.querySelector('img').src = 'path-to-dark-mode-google-logo.png';
  } else {
    googleButton.style.backgroundColor = 'white';
    // Change back to light mode Google logo
    googleButton.querySelector('img').src = 'path-to-light-mode-google-logo.png';
  }
}

function adjustGoogleButton() {
    const googleButton = document.querySelector('#googleSignInButton');
    if (googleButton) {
        googleButton.style.width = '100%';
        googleButton.style.maxWidth = '240px';
        const buttonContent = googleButton.querySelector('.nsm7Bb-HzV7m-LgbsSe-BPrWId');
        if (buttonContent) {
            buttonContent.style.justifyContent = 'center';
        }
    }
}

// Call this function after Google Sign-In is initialized
window.onload = function() {
    // ... your existing onload code ...
    setTimeout(adjustGoogleButton, 100); // Slight delay to ensure the button is rendered
};

// Initialize on page load
window.onload = function() {
    initGoogleSignIn();
    initAppleSignIn();
    initMetaSignIn();
    initXSignIn();
};
