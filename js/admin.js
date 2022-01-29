const title = document.querySelector('#title');
const content = document.querySelector('#article');
const button = document.querySelector('button[type="submit"]');

const tokenAdmin = localStorage.getItem('adminToken');
if (tokenAdmin == null) {
  Swal.fire({
    title: 'Only admin can access this page.',
    width: 400,
    padding: '3em',
    color: '#716add',
    background: '#fff url(/images/trees.png)',
    backdrop: `
    rgba(0,0,123,0.4)
    url("/images/nyan-cat.gif")
    left top
    no-repeat
  `,
  });
}

// delete article function
const deleteArticle = (id) => {
  fetch(`https://mybrand-api.herokuapp.com/api/articles/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': tokenAdmin,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === 'article deleted successfully') {
        swal('Deleted!', 'article has been Deleted', 'success');
      }
    })
    .catch((err) => console.log(err));
};
// delete query function
const deleteQuery = (id) => {
  fetch(`https://mybrand-api.herokuapp.com/api/contact/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': tokenAdmin,
    },
  })
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
};

// admin authorization checking
if (!(tokenAdmin == null)) {
  const queryURL = 'https://mybrand-api.herokuapp.com/api/contact/queries';

  // displaying all queries
  fetch(`${queryURL}`, {
    headers: {
      'auth-token': tokenAdmin,
    },
  }).then((res) => {
    if (res.ok) {
      res.json().then((jsonResponse) => {
        let queryData = jsonResponse.queries;
        if (queryData.length > 0) {
          queryData.forEach((query) => {
            document.getElementById('queries').innerHTML += `
            <h2>${query.name}</h2>
            <p id="email">${query.email}</p>
            <p>${query.content}</p>
            <p class="delete" id="delete" onclick="deleteQuery('${query._id}');">delete</p>
            <hr>     

        `;
          });
        }
      });
    }
  });

  // displaying all articles

  const getAllArticlesApi = 'https://mybrand-api.herokuapp.com/api/articles';
  fetch(`${getAllArticlesApi}`).then((res) => {
    if (res.ok) {
      res.json().then((jsonResponse) => {
        let articleData = jsonResponse.result;
        if (articleData.length > 0) {
          articleData.forEach((article) => {
            document.getElementById('article-section').innerHTML += `
                        <div id="article-selectio-first-div">
            <div class="picture">
                <img src="${article.articleImage}" alt="">
            </div>
            <div class="content" id="content">
                <h1><a href="./displayArticle.html">${article.title}</a> </h1>
                <p>${article.content}</p>
                <div class="like-comment">
                    <img src="../images/like-icon.png" alt="" >
                    <p id="like">like</p>
                    <img src="../images/comment-icon.png" alt="">
                    <p>7</p>
                    <p>time</p>
                    <p>date</p>
                    <p class="edit" id="edit" >Edit</p>
                    <p class="delete" id="delete" onclick="deleteArticle('${article._id}');">delete</p>
                </div>
            </div>
        </div>
        <hr>
                    `;
          });
        }
      });
    }
  });

  // create a new article
  button.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('https://mybrand-api.herokuapp.com/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': tokenAdmin,
      },
      body: JSON.stringify({
        title: title.value,
        content: content.value,
        articleImage: 'hekkjkshka',
      }),
    })
      .then((newArticle) => newArticle.json())
      .then((message) => {
        if (message === 'Invalid Token') {
          swal('Failed!', 'only admin can create an article', 'error');
        }
        if (message.status === 'saved successfuly') {
          (title.value = ''), (content.value = '');
          swal('Created!', 'article has been created successfully', 'success');
        }
        console.log(message);
      })
      .catch((err) => console.log(err));
  });
}
