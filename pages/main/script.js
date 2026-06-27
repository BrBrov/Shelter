import getData from '../../assets/scripts/getData.js';
import menuHandler from '../../assets/scripts/burger-menu.js';
import Carousel from '../../assets/scripts/carousel.js';
import cardsDataRebuilder from '../../assets/scripts/cardsDataRebuilder.js';
import shuffleData from '../../assets/scripts/shuffleData.js';
import LoadingElement from '../../assets/scripts/loading-element.js';

function start() {
  const loadingElement = new LoadingElement();

  document.querySelector('.carousel__container').appendChild(loadingElement.content);

  loadingElement.initAnimation();
  getData(loadingElement)
    .then(data => cardsDataRebuilder(data))
    .then(data => shuffleData(data))
    .then(data => new Carousel(data))
    .then(carousel => carousel.init())
    .then(() => loadingElement.deleteElement());


  document.querySelector('.header__btn-menu').addEventListener('click', menuHandler);
}

document.addEventListener('DOMContentLoaded', start);