const firebaseConfig = {
  apiKey: 'AIzaSyDDln8VGv4hKT9NWUkVjNA0X6Dj8SNwTHc',
  authDomain: 'atlp-capstone-project-a5a1f.firebaseapp.com',
  projectId: 'atlp-capstone-project-a5a1f',
  storageBucket: 'atlp-capstone-project-a5a1f.appspot.com',
  messagingSenderId: '39462084536',
  appId: '1:39462084536:web:c5cfcfc30a0d50c74a394d',
};
firebase.initializeApp(firebaseConfig);

function displayingArticles() {
  let article = firebase.database().ref('articles/');
  article.on('child_added', (data) => {
    let articleData = data.val();
    document.getElementById('article').innerHTML += `
            <div>
                <div class="article-1">
                    <div class="picture">
                        <img src="${articleData.image}" alt="">
                    </div>
                    <div class="content">
                        <h1><a href="javascript:openModal('${articleData.title}','${articleData.article}','${articleData.date}','${articleData.time}','${articleData.image}','${articleData.id}','${articleData.like}');">${articleData.title}</a> </h1>
                        <p>${articleData.article}</p>
                        <div class="like-comment">
                            <img src="../images/like-icon.png" alt="" onclick="likeFunction('${articleData.title}','${articleData.article}','${articleData.date}','${articleData.time}','${articleData.image}','${articleData.id}','${articleData.like}')">
                            <p>${articleData.like}</p>
                            <img src="../images/comment-icon.png" alt="">
                            <p>7</p>
                            <p>${articleData.date}</p>
                            <p>${articleData.time}</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            `;
  });
}
displayingArticles();

function likeFunction(title, articleContent, today, time, image, id, like) {
  let liked = Number(like) + 1;
  updateArticle(title, articleContent, today, time, image, id, liked);
  document.getElementById('article').innerHTML = '';
  displayingArticles();
}

function updateArticle(title, articleContent, today, time, image, id, like) {
  let articleUpdated = {
    id: id,
    title: title,
    article: articleContent,
    image: image,
    date: today,
    time: time,
    like: like,
  };
  let db = firebase.database().ref('articles/' + id);
  db.update(articleUpdated);
  // readArticle();
}

function openModal(title, articleContent, today, time, image, id, like) {
  document.getElementById('modal-bg').classList.add('bg-active');
  document.getElementById('section').innerHTML = `
        <h1>${title}</h1>
        <div class="like-comment">
            <img src="../images/like-icon.png" alt="">
            <p>${like}</p>
            <img src="../images/comment-icon.png" alt="">
            <p>5</p>
            <p>${today}</p>
            <p>${time}</p>
        </div>
        <div class="picture">
            <img src="" alt="">
        </div>
        <p id="paragraph">${articleContent}</p>
        <div class="comment-section">
            <form action="">
                <h4>leave a comment</h4>
                <div class="message">
                    <input type="text" placeholder="Type your comment here">
                    <button>send</button>
                </div>
            </form>
        </div>
    `;
}

let modal = document.getElementById('modal-bg');
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
