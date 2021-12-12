// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCFmzCWJJuoKMcdrjNIajRPaQQ-AiYfsLc",
    authDomain: "atlp-capstone-bd2e9.firebaseapp.com",
    projectId: "atlp-capstone-bd2e9",
    storageBucket: "atlp-capstone-bd2e9.appspot.com",
    messagingSenderId: "693672850388",
    appId: "1:693672850388:web:dca25fa5131c04d97a9c41",
    measurementId: "G-3EZGTB3SBV"
  };


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
})