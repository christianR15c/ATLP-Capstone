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
// localStorage.removeItem('userToken');
sessionStorage.removeItem('adminToken');
