const button = document.querySelector('input[type="button"]');
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[type="email"]');
const passswordInput = document.querySelector('input[type="password"]');
const emailValidation = document.querySelector('div[id="hidden-email"]');
const passwordValidation = document.querySelector('div[id="hidden-password"]');
const loader = document.querySelector('.loader');

const regexEmail = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
const regexPassword = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})'
);
const validator = () => {
  if (!nameInput.value) {
    nameInput.nextElementSibling.classList.remove('hidden');
  } else if (!emailInput.value.includes('@')) {
    emailInput.nextElementSibling.classList.remove('hidden');
  } else if (!passswordInput.value) {
    passswordInput.nextElementSibling.classList.remove('hidden');
  } else if (regexEmail.test(passswordInput.value)) {
    emailValidation.removeAttribute('id');
  } else if (regexPassword.test(passswordInput.value)) {
    passwordValidation.removeAttribute('id');
  } else {
    loader.classList.add('loader-active');
    button.disabled = true;
    console.log(nameInput.value);
    fetch('https://mybrand-api.herokuapp.com/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        password: passswordInput.value,
      }),
    })
      .then((addedUser) => {
        console.log(addedUser);
        if (addedUser.ok) {
          swal('Thank you!', 'You have registered successfully', 'success');
          loader.classList.remove('loader-active');
          resetForm();
        } else {
          swal('Failed!', 'Registration not happened at this time', 'error');
          loader.classList.remove('loader-active');
          resetForm();
        }
      })
      .catch((err) => console.log(err));
  }
};

button.addEventListener('click', (e) => {
  e.preventDefault();
  validator();
});

function resetForm() {
  document.getElementById('form').reset();
}
// Swal.fire({
//   icon: 'error',
//   title: `failed`,
// });
