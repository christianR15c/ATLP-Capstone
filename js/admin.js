const addArticleButton = document.getElementById('create-article-form');

addArticleButton.addEventListener('submit', (e) => {
    let title = document.getElementById('title').value;
    let article = document.getElementById('article').value;
    e.preventDefault();
    if(title !== '' && article !== ''){
        /* --- create time and date article added ---*/
        let date=new Date();  
        let day=date.getDate();  
        let month=date.getMonth()+1;  
        let year=date.getFullYear();  
        let h=date.getHours();  
        let m=date.getMinutes();  
        let thedate = `${day}/${month}/${year}`; 
        let thetime = `${h}:${m}`;
        let image = imgURL;
        // console.log(imgURL);
        createArticle(title, article, thedate, thetime, image);
        addArticleButton.reset();
    }
    else if(!title){
        document.getElementById('title').nextElementSibling.classList.remove('hidden');
    }
    else if(!article){
        document.getElementById('article').nextElementSibling.classList.remove('hidden');
    }
});




/* --------------- Retrieving queries data from database -----------------*/


function readArticle() {
    let article = firebase.database().ref('articles/');
    article.on('child_added', (data) => {
      let articleData = data.val();
      document.getElementById('article-section').innerHTML+=`
        <div id="article-selectio-first-div">
            <div class="picture">
                <img src="${articleData.image}" alt="">
            </div>
            <div class="content" id="content">
                <h1><a href="./displayArticle.html">${articleData.title}</a> </h1>
                <p>${articleData.article}</p>
                <div class="like-comment">
                    <img src="../images/like-icon.png" alt="" onclick="likeFunction('${articleData.title}','${articleData.article}','${articleData.date}','${articleData.time}','${articleData.image}','${articleData.id}','${articleData.like}')">
                    <p id="like">${articleData.like}</p>
                    <img src="../images/comment-icon.png" alt="">
                    <p>7</p>
                    <p>${articleData.date}</p>
                    <p>${articleData.time}</p>
                    <p class="edit" id="edit" onclick="openModal('${articleData.title}','${articleData.article}','${articleData.date}','${articleData.time}','${articleData.image}','${articleData.id}'); ">Edit</p>
                    <p class="delete" id="delete" onclick="deleteArticle('${articleData.id}','${articleData.imageName}');">delete</p>
                </div>
            </div>
        </div>
        <hr>
      `
      })
  }

/* ----------- like function ---------- */
function likeFunction(title, articleContent, today, time, image, id, like){
      console.log(like);
      let liked = Number(like) + 1;
      updateArticle(title, articleContent, today, time, image, id, liked);
      document.getElementById('article-section').innerHTML = '';
      readArticle();
}


/* -------------- edit modal ------------- */

function openModal(title, articleContent, today, time, image, id) {
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
    `
    
    document.getElementById('update').addEventListener('click', (e) => {
        e.preventDefault();
        let newTitle = document.querySelector('input[name="title"]').value;
        let newArticle = document.querySelector('input[name="message"]').value;
        updateArticle(newTitle, newArticle, today, time, image, id);
        document.getElementById('article-section').innerHTML = '';
        readArticle();
        document.getElementById('modal-bg').classList.remove('bg-active');
    })
    document.getElementById('cancel').addEventListener('click', (e) => {
        document.getElementById('modal-bg').classList.remove('bg-active');
        e.preventDefault();
    })
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

/* ------------------ Retrieving queries data from database ------------------*/

function readQuery ()  {
    let queries = firebase.database().ref('messages/');
    queries.on('child_added', (data) => {
        let queriesData = data.val();
        document.getElementById('queries').innerHTML +=  `
            <h2>${queriesData.name}</h2>
            <p id="email">${queriesData.email}</p>
            <p>${queriesData.message}</p>
            <p class="delete" id="delete" onclick="deleteQuery();">delete</p>
            <hr>

        `
    })
};


