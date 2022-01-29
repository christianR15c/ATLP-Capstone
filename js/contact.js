const button = document.getElementsByTagName('button')[0];
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[type="email"]');
const messageInput = document.querySelector('input[name="message"]');

const token = localStorage.getItem('token');

const validator = () => {
  if (!nameInput.value) {
    nameInput.nextElementSibling.classList.remove('name-hidden');
  }
  if (!emailInput.value.includes('@')) {
    emailInput.nextElementSibling.classList.remove('email-hidden');
  }
  if (!messageInput.value) {
    messageInput.nextElementSibling.classList.remove('message-hidden');
  }
  fetch('https://mybrand-api.herokuapp.com/api/contact/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      name: nameInput.value,
      email: emailInput.value,
      content: messageInput.value,
    }),
  })
    .then((res) => console.log(res.text()))
    .catch((err) => console.log(err));
};

button.addEventListener('click', (e) => {
  e.preventDefault();
  validator();
  document.getElementById('contactForm').reset();
});
