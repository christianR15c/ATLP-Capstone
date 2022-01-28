const button = document.querySelector('input[type="button"]');
const emailInput = document.querySelector('input[type="text"]');
const passswordInput = document.querySelector('input[type="password"]');
const loader = document.querySelector('.loader');

const validator = () => {
  if (!emailInput.value.includes('@')) {
    emailInput.nextElementSibling.classList.remove('hidden');
  }
  if (!passswordInput.value) {
    passswordInput.nextElementSibling.classList.remove('hidden');
  } else {
    loader.classList.remove('loader-active');
    fetch('https://mybrand-api.herokuapp.com/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailInput.value,
        password: passswordInput.value,
      }),
    })
      .then((res) => res.json())
      .then((loggedUser) => {
        console.log(loggedUser);
        if (!loggedUser.ok) {
          swal('Failed!', 'Invalid username or password', 'error');
          loader.classList.remove('loader-active');
          resetForm();
        } else {
          console.log(loggedUser);
          window.location.href = '../html/index.html';
        }
      })
      .catch((err) => console.log(err));
  }
};

button.addEventListener('click', (e) => {
  e.preventDefault();
  validator();
  resetForm();
});

function resetForm() {
  document.getElementById('form').reset();
}
