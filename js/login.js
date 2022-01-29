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
    loader.classList.add('loader-active');
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
        if (loggedUser.user) {
          if (loggedUser.user.isAdmin) {
            localStorage.setItem('adminToken', loggedUser.adminToken);
            window.location.href = '../html/admin.html';
          } else {
            localStorage.setItem('userToken', loggedUser.token);
            window.location.href = '../html/index.html';
          }
        } else {
          swal('Login Failed!', 'Invalid username or password', 'error');
          resetForm();
          loader.classList.remove('loader-active');
        }
      })
      .catch((err) => console.log(err));
  }
};

button.addEventListener('click', (e) => {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenAdmin');
  e.preventDefault();
  validator();
  resetForm();
});

function resetForm() {
  document.getElementById('form').reset();
}
