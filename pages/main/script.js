import getData from '../../assets/scripts/getData.js';
import menuHandler from '../../assets/scripts/burger-menu.js';

getData();

document.querySelector('.header__btn-menu').addEventListener('click', menuHandler);