const title = document.querySelector('#title');
const content = document.querySelector('#article');
const button = document.querySelector('button[type="submit"]');

const tokenAdmin = sessionStorage.getItem('adminToken');
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
                    <p>${article.comments.length}</p>
                    <p>time</p>
                    <p>date</p>
                    <p class="edit" id="edit" onclick="openModal('${article.title}','${article.content}','${article._id}');">Edit</p>
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

  //upload image
  let uploadedFileUrl;
  const CLOUDINARY_URL =
    'CLOUDINARY_URL=cloudinary://455193126486473:z5h9FCLTPDJZV00XIvCFu6ZEQ1c@christian-habineza/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'mybrand-website-images';
  const image = document.querySelector('#file');
  image.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    fetch(
      'CLOUDINARY_URL=cloudinary://455193126486473:z5h9FCLTPDJZV00XIvCFu6ZEQ1c@christian-habineza/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url !== '') {
          uploadedFileUrl = data.secure_url;
        }
      })
      .catch((err) => console.error(err));
  });

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
        articleImage: uploadedFileUrl,
      }),
    })
      .then((newArticle) => newArticle.json())
      .then((message) => {
        if (message === 'Invalid Token') {
          swal(
            'Failed!',
            'you are not admin, only admin can create an article',
            'error'
          );
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

// ------------- edit model ----------------
const openModal = (title, articleContent, id) => {
  document.getElementById('modal-bg').classList.add('bg-active');
  document.getElementById('modal-bg').innerHTML = `
        <form class="modal">
            <h2>Edit your Article</h2>
            <label for="name" >Title</label>
            <input type="text" name="title" value="${title}" id="title">
            <label for="name" id="labe">Article</label>
            <input type="text" name="message" value="${articleContent}" id="article">
            <div class="button">
                <button type="submit" id="update">update</button>
                <button id="cancel">Cancel</button>
            </div>
        </div>
    `;
  document.getElementById('update').addEventListener('click', (e) => {
    e.preventDefault();
    let newTitle = document.querySelector('input[name="title"]').value;
    let newArticle = document.querySelector('input[name="message"]').value;

    // fetch update apis
    fetch(`https://mybrand-api.herokuapp.com/api/articles/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'auth-token': tokenAdmin,
      },
      body: JSON.stringify({
        title: newTitle,
        content: newArticle,
      }),
    })
      .then((res) => res.json())
      .then((updatedArticle) => {
        console.log(updatedArticle);
        swal(
          'Updated!',
          `${updatedArticle.article.title} Article has been updated successfully`,
          'success'
        );
        document.getElementById('modal-bg').classList.remove('bg-active');
      })
      .catch((err) => console.log(err));
  });
};
// sessionStorage.removeItem('tokenAdmin');
