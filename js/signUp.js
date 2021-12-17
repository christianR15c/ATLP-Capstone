const button = document.querySelector('input[type="button"]');
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[type="email"]')
const passswordInput = document.querySelector('input[type="password"]');
const emailValidation = document.querySelector('div[id="hidden-email"]');
const passwordValidation = document.querySelector('div[id="hidden-password"]')
// const passwordNumber = document.querySelector('div[id="hidden-number"]');


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
    const regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    const regexPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
    if(!passswordInput.value){
        passswordInput.nextElementSibling.classList.remove('hidden');
    }
    else if(regexEmail.test(passswordInput.value)){
        emailValidation.removeAttribute('id');
    }
    else if(regexPassword.test(passswordInput.value)){
        passwordValidation.removeAttribute('id');
    }
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    validateName();
    validateEmail();
    validatePassword();
    signUpAuth();
})
