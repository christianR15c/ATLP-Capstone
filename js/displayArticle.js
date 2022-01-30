const button = document.getElementById('button');
const text = document.getElementById('text');

const tokenUser = sessionStorage.getItem('userToken');

button.addEventListener('click', (e) => {
  e.preventDefault();
  fetch(`https://mybrand-api.herokuapp.com/api/articles/comment/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': tokenUser,
    },
    body: JSON.stringify({
      text: text.value,
    }),
  })
    .then((newArticle) => {
      if (newArticle.ok) {
        swal('thank you!', 'comment sent', 'success');
        text.value = '';
      }
    })
    .catch((err) => console.log(err));
});

const displayComment = () => {};
