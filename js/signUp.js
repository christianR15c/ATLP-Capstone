const button = document.querySelector('input[type="button"]');
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[type="email"]')
const passswordInput = document.querySelector('input[type="password"]');
const passwordLength = document.querySelector('div[id="hidden-length"]');
const passwordUpperCase = document.querySelector('div[id="hidden-uppercase"]');

const validateName = () => {
    if(!nameInput.value){
        nameInput.nextElementSibling.classList.remove('hidden')
    }
}

const validateEmail = () => {
    if(!emailInput.value.includes('@')){
        emailInput.nextElementSibling.classList.remove('hidden')
    }
}

const validatePassword = () => {
    if(!passswordInput.value){
        passswordInput.nextElementSibling.classList.remove('hidden');
    }
    else if(passswordInput.value.length < 8){
        passwordLength.removeAttribute('id');
    }
    else if(!passswordInput.value.includes('[A-Z]')){
        passwordUpperCase.removeAttribute('id');
    }
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    validateName();
    validateEmail();
    validatePassword();
})