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


/* -------------- uploading image to the storage -------------*/

let files = [];
let reader = new FileReader();
let imgURL;
let imageName;

let myimg = document.getElementById('photo');
let proglab = document.getElementById('UpProgress');
let upBtn = document.getElementById('uploadBtn');
let selectedImage = document.querySelector('#file');

selectedImage.addEventListener('change', (e) => {
    files = e.target.files;

    let extension;
    let name;

    extension = GetFileExtension(files[0]);
    name = GetFileName(files[0]);

    reader.readAsDataURL(files[0]);
    document.getElementById('imageName').innerHTML=`<label id="myImageName">${name}${extension}</label>`;
    imageName = `${name}${extension}`;
})

reader.onload = function() {
    myimg.src = reader.result;
}

function GetFileExtension(file) {
    let temp = file.name.split('.');
    let ext = temp.slice((temp.length-1),(temp.length));
    return '.'+ext[0];
}

function GetFileName(file) {
    let temp = file.name.split('.');
    let fname = temp.slice(0,temp.length-1).join('.');
    // imageName=fname;
    return fname;
}

function UploadProcess() {
    let ImgToUpload = files[0];
    let ImgName = document.getElementById('myImageName').textContent;
    console.log(ImgName);
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const UploadTask = storageRef.child('Images/'+ImgName).put(ImgToUpload);
    UploadTask.on('state_changed', (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        proglab.innerHTML = `uplaod is on ${progress} %`;
        if (progress === 100) {
            
        }
    },
    (error) => {
        alert('error: image not uploaded')
    },
    () => {
        storageRef.child('Images/'+ImgName).getDownloadURL().then((downloadURL) => {
            imgURL = downloadURL;
        })
    }
    );
}
document.getElementById('uploadBtn').addEventListener('click', UploadProcess);



/* ---------- Adding articles to firebase ------------- */

function createArticle(title, articleContent, today, time, image, imageNam=imageName, like = 0) {
    counter+=1;
    let articles = {
    id: counter,
    title: title,
    article: articleContent,
    image: image,
    date: today,
    time: time,
    imageName: imageNam,
    like: like
    }


    firebase.database().ref('articles/'+counter).set(articles);
    swal("Good job!", "Article successfully added", "success");
    document.getElementById('title').value = 'Title';
    document.getElementById('article').value = 'Content';
    document.getElementById('UpProgress').innerHTML = '';
    document.getElementById('imageName').innerHTML = '';
    document.getElementById('photo').src = '../images/choose image.png';
    displayingArticles();
}   


function deleteArticle(id, imageName) {
    document.getElementById('modal-bg1').classList.add('bg-active1');
    document.getElementById('cancel1').addEventListener('click', ()=>{
        document.getElementById('modal-bg1').classList.remove('bg-active1');
    });
    document.getElementById('delete1').addEventListener('click', () => {
        document.getElementById('modal-bg1').classList.remove('bg-active1');
        let article = firebase.database().ref('articles/'+id);
        article.remove();
        let desertRef = firebase.storage().ref().child('Images/'+imageName);
        desertRef.delete();


        // reset();
        document.getElementById('article-section').innerHTML = '';
        swal("Good job!", "Article successfully Deleted", "success");
        readArticle();
        })
    
}

/* -------------------------adding queries to database -------------------- */

function createQuery(name, userEmail, message) {
    counter += 1;
    let messages = {
        id: counter,
        name: name,
        email: userEmail,
        message: message
    }
    firebase.database().ref('messages/'+counter).set(messages);
    swal("Thank you for your concer!", "Message has sent successfuly", "success");
}

/* ------------- delete a query ------------ */
function deleteQuery() {
    let MessageData;
    let messages = firebase.database().ref('messages/');
    messages.on('child_added', (data) => {
        MessageData = data.val();
    })
    let message = firebase.database().ref('messages/'+MessageData.id);
    message.remove();
    document.getElementById('queries').innerHTML = '';
    swal("Good job!", "message successfully Deleted", "success");
    readQuery();
}

/* ------------ Sign Up Authentication -------------------- */

function signUpAuth() {
    let email = document.getElementById('input-email');
    let password = document.getElementById('input-password');
    resetForm();

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    let user = userCredential.user;
    swal("Well Done !", "sign up was done successfuly", "success");
    // ...
  })
  .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    // ..
  });
}





