
const button = document.querySelector('input[type="button"]')
const emailInput = document.querySelector('input[type="email]');
const password = document.querySelector('input[type="password"]');
const repeatPassword = document.querySelector('input[placeholder="repeat password"')

const validateEmail = () => {
    if(!emailInput.value.includes('@')){
        emailInput.nextElementSibling.classList.remove('email-hidden');
    }
}

const validatePassword = () => {
    if(!password.value){
        password.nextElementSibling.classList.remove('hidden');
    }
}
button.addEventListener('click', (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
})
