const queryURL = 'https://mybrand-api.herokuapp.com/api/contact/queries';

fetch(`${queryURL}`).then((res) => {
  if (res.ok) {
    res.json().then((jsonResponse) => {
      let queryData = jsonResponse;
      if (queryData.length > 0) {
        queryData.forEach((query) => {
          document.getElementById('queries').innerHTML += `
            <h2>${query.name}</h2>
            <p id="email">${query.email}</p>
            <p>${query.content}</p>
            <p class="delete" id="delete" onclick="deleteQuery();">delete</p>
            <hr>     

        `;
        });
      }
    });
  }
});

const getAllArticlesApi = 'https://mybrand-api.herokuapp.com/api/articles';
fetch(`${getAllArticlesApi}`).then((res) => {
  if (res.ok) {
    res.json().then((jsonResponse) => {
      let articleData = jsonResponse;
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
                    <p class="delete" id="delete" >delete</p>
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
