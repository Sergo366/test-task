window.addEventListener('load', function() {
    const stylesheet = document.getElementById('popup-styles');
    stylesheet.href = './popup.css';
});


const signupButton = document.getElementById('signupButton');
const popupTitle = document.getElementById('popup-title');
const popup = document.getElementById('popup');
const wrapper = document.getElementById('wrapper');
const closeButton = document.getElementById('closeButton');
const signupForm = document.getElementById('signupForm');
const thankYouMessage = document.getElementById('thankYouMessage');

signupButton.addEventListener('click', () => {
    popup.style.display = 'flex';
    wrapper.style.filter = 'blur(15px)';
});

closeButton.addEventListener('click', closePopup);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

function closePopup() {
    popup.style.display = 'none';
    wrapper.style.filter = 'none';
}

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://api.dating.com/identity', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        signupForm.style.display = 'none';
        popupTitle.style.display = 'none';
        thankYouMessage.style.display = 'block';
        setTimeout(() => closePopup(), 3000);
    } else {
        alert('Registration failed. Please try again.');
    }
});
