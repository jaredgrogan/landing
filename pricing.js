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
            console.error('Sign-in failed:', data.error);
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

// Initialize on page load
window.onload = function() {
    initGoogleSignIn();
    initAppleSignIn();
};
