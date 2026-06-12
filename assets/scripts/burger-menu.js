function menuHandler() {
  const menu = document.querySelector('.header__navigation');
  const button = document.querySelector('.header__btn-menu');

  
  if (menu.classList.contains('header__navigation_open')) {
    menu.classList.remove('header__navigation_open');
    button.classList.remove('header__btn-menu_open');

    menu.removeEventListener('click', menuHandler);

    scrollHandler(false);
  } else {
    menu.classList.add('header__navigation_open');
    button.classList.add('header__btn-menu_open');
    
    menu.addEventListener('click', menuHandler);

    scrollHandler(true);
  }
}

function scrollHandler(mode) {
  if (mode) {
    document.body.style.setProperty('overflow', 'hidden');
    document.body.style.setProperty('max-height', '100vh');
  } else {
    document.body.style.setProperty('overflow', 'auto');
    document.body.style.setProperty('max-height', 'unset');
  }
}

export default menuHandler;