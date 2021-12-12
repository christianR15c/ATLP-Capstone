const button = document.querySelector('input[type="button"]');
const passwordInput = document.querySelector('input[type="password"]');
const nameInput = document.querySelector('input[type="text"]');
const emailInput = document.querySelector('input[type="email"]');
const repeatPasswordInput = document.getElementsByClassName('passRepeat')

const validateName = () => {
    if(!nameInput.value){
        nameInput.nextElementSibling.classList.remove('hidden');
    }
}

const validateEmail = () => {
    if(!emailInput.value){
        emailInput.nextElementSibling.classList.remove('hidden');
    }
}

const validatePassword = () => {
    if(!passwordInput.value){
        passwordInput.nextElementSibling.classList.remove('hidden');
    }
}

const validateRepeatPassword = () => {
    if(!repeatPasswordInput){
        repeatPasswordInput.nextElementSibling.classList.remove('hidden');
    }
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    validateRepeatPassword();
    validateName();
})