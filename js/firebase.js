const firebaseConfig = {
    apiKey: "AIzaSyDDln8VGv4hKT9NWUkVjNA0X6Dj8SNwTHc",
    authDomain: "atlp-capstone-project-a5a1f.firebaseapp.com",
    projectId: "atlp-capstone-project-a5a1f",
    storageBucket: "atlp-capstone-project-a5a1f.appspot.com",
    messagingSenderId: "39462084536",
    appId: "1:39462084536:web:c5cfcfc30a0d50c74a394d"
  };
  firebase.initializeApp(firebaseConfig);

  let theDate = new Date();
  let theTime = theDate.getTime();
  let counter = theTime;

    function createArticle(title, articleContent, imgURL) {
      counter+=1;
      let articles = {
          id: counter,
          title: title,
          article: articleContent,
        //   image: imgURL
      }

    //   let uploadImage = firebase.storage().ref('Images'+counter).put(files[0]);
    //   uploadImage.on('state_changed', (snapshot) => {
    //       let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       document.getElementById('UpProgress').innerHTML = `upload is on ${progress} %`;
    //   })

      firebase.database().ref('articles/'+counter).set(articles);
      readArticle();
      swal("Good job!", "Article successfully added", "success");
  }

  function readArticle() {
      let article = firebase.database().ref('articles/');
      article.on('child_added', (data) => {
        let articleData = data.val();
        document.getElementById('article-section').innerHTML+=`
            <div class="picture">
                <img src="../images/coding1.jpg" alt="">
            </div>
            <div class="content" id="content">
                <h1><a href="./displayArticle.html">${articleData.title}</a> </h1>
                <p>${articleData.article}</p>
                <div class="like-comment">
                    <img src="../images/like-icon.png" alt="">
                    <p>6</p>
                    <img src="../images/comment-icon.png" alt="">
                    <p>7</p>
                    <p>${articleData.date}</p>
                    <p>${articleData.time}</p>
                    <p class="edit" id="edit" onclick="openEditModal(); ">Edit</p>
                    <p class="delete" id="delete" onclick="deleteArticle();">delete</p>
                </div>
            </div>
        `
        })
    }

function openEditModal() {
    document.getElementById('modal-bg').classList.add('bg-active');
    document.getElementById('cancel').addEventListener('click', ()=>{
        document.getElementById('modal-bg').classList.remove('bg-active');
    })
}

function deleteArticle() {
    document.getElementById('modal-bg1').classList.add('bg-active1');
    document.getElementById('cancel1').addEventListener('click', ()=>{
        document.getElementById('modal-bg1').classList.remove('bg-active1');
    });
    document.getElementById('delete1').addEventListener('click', () => {
        document.getElementById('modal-bg1').classList.remove('bg-active1');
        let articleData;
        let articles = firebase.database().ref('articles/');
        articles.on('child_added', (data) => {
            articleData = data.val();
        })
        let article = firebase.database().ref('articles/'+articleData.id);
        article.remove();
        // reset();
        document.getElementById('article-section').innerHTML = '';
        readArticle();
        swal("Good job!", "Article successfully Deleted", "success");
        })
    
}

function updateArticle(id, title, article) {
    document.getElementById('article-form').innerHTML = `
    <form id="create-article-form">
        <h3>Add Article</h3>
        <input type="text" placeholder="Ttle" class="title" id="title">
        <input type="text" placeholder="content" class="body" id="article">
        <div class="image-div"><img src="../images/choose image.png" alt="" id="photo"></div>
        <input type="file" id="file">
        <label id="uploadBtn">uplaod image</label>
        <label id="UpProgress"></label>
        <button type="submit">Add Article</button>
    </form>

    `;
}

/* ------------------------- contact -------------------- */

function createQuery(name, email, message) {
    counter += 1;
    let messages = {
        id: counter,
        name: name,
        email: email,
        message: message
    }
    firebase.database().ref('messages/'+counter).set(messages);
    swal("Thank you for your concer!", "Message has sent successfuly", "success");
    document.getElementById('queries').innerHTML = '';
}

/* ------------ Authentication -------------------- */
// const auth = firebase.auth();
function signUpAuth() {
    let email = document.getElementById('input-email');
    let password = document.getElementById('input-password');
    alert(email.value)

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    let user = userCredential.user;
    // ...
  })
  .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    // ..
  });
}