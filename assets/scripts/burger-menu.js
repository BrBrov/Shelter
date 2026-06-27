function menuHandler() {
  if (document.querySelector('.header__navigation').classList.contains('header__navigation_open')) {
    closeMenu();
  } else {
    openMenu();
  }
}

function closeMenuHandler(event) {
  const { target } = event;

  if (target.className.match(new RegExp('header__navigation*', 'gi')) || target.className.match(new RegExp('header__btn-menu*', 'gi'))) {
    return;
  }

  event.stopPropagation();
  event.preventDefault();
  closeMenu();
}

function closeMenu() {
  document.querySelector('.header__navigation').classList.remove('header__navigation_open');
  document.querySelector('.header__btn-menu').classList.remove('header__btn-menu_open');

  document.querySelector('.header__navigation').removeEventListener('click', menuHandler);
  document.removeEventListener('click', closeMenuHandler);

  scrollHandler(false);
}

function openMenu() {
  document.querySelector('.header__navigation').classList.add('header__navigation_open');
  document.querySelector('.header__btn-menu').classList.add('header__btn-menu_open');

  document.querySelector('.header__navigation').addEventListener('click', menuHandler);
  document.addEventListener('click', closeMenuHandler);
  scrollHandler(true);
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