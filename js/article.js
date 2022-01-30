const toggle_btn = document.querySelector('#toggle-btn');
const nav = document.querySelector('.nav-links');
const close = document.querySelector('.closing-image');
toggle_btn.addEventListener('click', () => {
  nav.classList.add('nav-active');
  close.classList.add('nav-active');
  toggle_btn.setAttribute('id', 'hideToggle');
});
close.addEventListener('click', () => {
  close.classList.remove('nav-active');
  nav.classList.remove('nav-active');
  toggle_btn.setAttribute('id', 'toggle-btn');
  // toggle_btn.parentNode.removeChild(hideToggle);
});

const tokenUser = sessionStorage.getItem('userToken');

// fetching APIs

const getAllArticlesApi = 'https://mybrand-api.herokuapp.com/api/articles';

fetch(`${getAllArticlesApi}`)
  .then((res) => {
    if (res.ok) {
      res.json().then((jsonResponse) => {
        let articleData = jsonResponse.result;
        if (articleData.length > 0) {
          articleData.forEach((article) => {
            document.getElementById('article').innerHTML += `
            <div>
                <div class="article-1">
                    <div class="picture">
                        <img src="${article.articleImage}" alt="">
                    </div>
                    <div class="content">
                        <h1><a href="#">${article.title}</a></h1>
                        <p >${article.content}</p>
                        <div class="like-comment">
                            <img src="../images/like-icon.png" alt="">
                            <p>$</p>
                            <img src="../images/comment-icon.png" alt="" onclick="allComments('${article._id}');">
                            <p>${article.comments.length}</p>
                            <p></p>
                            <p></p>    
                        </div>
                        <div id="comment-field">
                          <input type="text" placeholder="Type your comment here" id="comment-input"/>
                          <button id="submitButton" onclick="commentArticle('${article._id}');">send</button>
                        </div>
                        <div id="comments"></div>
                    </div>
                </div>
            </div>
            <hr>
            `;
          });
        }
      });
    }
  })
  .catch((err) => console.log(err));

// comment on article function
const commentArticle = (id) => {
  const text = document.getElementById('comment-input');
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
    .then((res) => res.json())
    .then((newArticle) => {
      console.log(newArticle);
      if (newArticle.status === 'successfully updated') {
        swal('thank you!', 'comment sent', 'success');
        text.value = '';
      }
    })
    .catch((err) => console.log(err));
};

// get comments function
const allComments = (id) => {
  fetch(`https://mybrand-api.herokuapp.com/api/articles/${id}`)
    .then((res) => res.json())
    .then((article) => {
      const articleData = article.result.comments;
      console.log(article.result.comments);
      articleData.forEach((article) => {
        document.getElementById('comments').innerHTML += `
          <h4>${article.postedBy}</h4>
          <p>${article.text}</p>
        `;
      });
    });
};
