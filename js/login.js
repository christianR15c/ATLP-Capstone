const button = document.querySelector('input[type="button"]');
const emailInput = document.querySelector('input[type="text"]');
const passswordInput = document.querySelector('input[type="password"]');

const validateEmail = () => {
    if(!emailInput.value.includes('@')){
        emailInput.nextElementSibling.classList.remove('hidden')
    }
}

const validatePassword = () => {
    if(!passswordInput.value){
        passswordInput.nextElementSibling.classList.remove('hidden');
    }
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    resetForm();
});

function resetForm() {
    document.getElementById("form").reset();
}