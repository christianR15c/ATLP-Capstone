const addArticleButton = document.getElementById('create-article-form');

addArticleButton.addEventListener('submit', (e) => {
    let title = document.getElementById('title').value;
    let article = document.getElementById('article').value;
    e.preventDefault();
    createArticle(title, article);
    addArticleButton.reset();
    document.getElementById('article-section').innerHTML='';
});

let reader;
let imgName;
let files = [];
function uplaodImage(file) {
    file.addEventListener('change', (e) => {
        files = e.target.files;
        reader = new FileReader();
        reader.addEventListener('load', () => {
            document.getElementById('photo').src = reader.result;
        })
        reader.readAsDataURL(files[0]);
    })
}
uplaodImage(document.querySelector('#file'));

// document.getElementById('uploadBtn').addEventListener('click', () => {
//     let uploadTask = firebase.storage().ref('Images').put(files[0]);
//     uploadTask.on('change', (snapshot) => {
//         let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     document.getElementById('UpProgress').innerHTML = `uplaod is ${progress} %`;
//     })
// })

/* ------------------ Retrieving queries data from database ------------------*/



(function readQuery ()  {
    let queries = firebase.database().ref('messages/');
    queries.on('child_added', (data) => {
        let queriesData = data.val();
        document.getElementById('queries').innerHTML +=  `
            <h2>${queriesData.name}</h2>
            <p${queriesData.email}</p>
            <p>${queriesData.message}</p>
            <hr>

        `
    })
})();