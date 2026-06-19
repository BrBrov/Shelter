import getData from '../../assets/scripts/getData.js';
import menuHandler from '../../assets/scripts/burger-menu.js';
import Carousel from '../../assets/scripts/carousel.js';
import cardsDataRebuilder from '../../assets/scripts/cardsDataRebuilder.js';
import shuffleData from '../../assets/scripts/shuffleData.js';

getData()
.then(data => cardsDataRebuilder(data))
.then(data => shuffleData(data))
.then(data => new Carousel(data))
.then(carousel => carousel.init())


document.querySelector('.header__btn-menu').addEventListener('click', menuHandler);