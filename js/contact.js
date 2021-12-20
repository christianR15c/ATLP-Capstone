const button = document.getElementsByTagName('button')[0];
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[type="email"]');
const messageInput = document.querySelector('input[name="message"]');

const validateInput = () => {
    if(!nameInput.value){
        nameInput.nextElementSibling.classList.remove('name-hidden');
    }
}

const validateEmail = () => {
    if(!emailInput.value.includes('@')){
        emailInput.nextElementSibling.classList.remove('email-hidden');
    }
}

const validateMessage = () => {
    if(!messageInput.value){
        messageInput.nextElementSibling.classList.remove('message-hidden');
    }
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    validateInput();
    validateEmail();
    validateMessage();
    createQuery(nameInput.value, emailInput.value, messageInput.value);
    document.getElementById('contactForm').reset();
})