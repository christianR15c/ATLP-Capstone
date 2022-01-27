const navSlide = () => {
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
};
navSlide();

// fetching APIs

const getAllArticlesApi = 'https://mybrand-api.herokuapp.com/api/articles';

fetch(`${getAllArticlesApi}`)
  .then((res) => {
    if (res.ok) {
      res.json().then((jsonResponse) => {
        let articleData = jsonResponse;
        if (articleData.length > 0) {
          articleData.forEach((article) => {
            document.getElementById('article').innerHTML += `
            <div>
                <div class="article-1">
                    <div class="picture">
                        <img src="${article.articleImage}" alt="">
                    </div>
                    <div class="content">
                        <h1><a href="#"</a>${article.title}</h1>
                        <p>${article.content}</p>
                        <div class="like-comment">
                            <img src="../images/like-icon.png" alt="">
                            <p>$</p>
                            <img src="../images/comment-icon.png" alt="">
                            <p>7</p>
                            <p></p>
                            <p></p>
                        </div>
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
