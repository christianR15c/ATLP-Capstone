const firebaseConfig = {
    apiKey: "AIzaSyDDln8VGv4hKT9NWUkVjNA0X6Dj8SNwTHc",
    authDomain: "atlp-capstone-project-a5a1f.firebaseapp.com",
    projectId: "atlp-capstone-project-a5a1f",
    storageBucket: "atlp-capstone-project-a5a1f.appspot.com",
    messagingSenderId: "39462084536",
    appId: "1:39462084536:web:c5cfcfc30a0d50c74a394d"
  };
  firebase.initializeApp(firebaseConfig);


function displayingArticles() {
    let article = firebase.database().ref('articles/');
    article.on('child_added', (data) => {
        let articleData = data.val();
        document.getElementById('article').innerHTML = `
            <div class="article-1">
                <div class="picture">
                    <img src="${articleData.image}" alt="">
                </div>
                <div class="content">
                    <h1><a href="./displayArticle.html">${articleData.title}</a> </h1>
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
            `
        })
    }   
displayingArticles();

function likeFunction(title, articleContent, today, time, image, id, like){
    console.log(like);
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
        like: like
    }
    let db = firebase.database().ref('articles/'+id);
    db.update(articleUpdated);
    // readArticle();
}