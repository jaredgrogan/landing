document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.getElementById('emailForm');
    emailForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('emailInput').value;
        const firstName = document.getElementById('firstNameInput').value;
        const lastName = document.getElementById('lastNameInput').value;
        // Add other input fields as necessary
        const data = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            linkedin: document.getElementById('linkedinInput').value,
            twitter: document.getElementById('twitterInput').value,
            instagram: document.getElementById('instagramInput').value,
            google: document.getElementById('googleInput').value,
            youtube: document.getElementById('youtubeInput').value,
            substack: document.getElementById('substackInput').value,
            personal_site: document.getElementById('personalSiteInput').value,
            employer: document.getElementById('employerInput').value,
            headline: document.getElementById('headlineInput').value
        };
        const response = await fetch('/submit_email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            window.location.href = 'login.html';
        } else {
            alert('Failed to submit email. Please try again.');
        }
    });
});
