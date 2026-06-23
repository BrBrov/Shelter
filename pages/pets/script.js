import menuHandler from '../../assets/scripts/burger-menu.js';
import cardsDataRebuilder from '../../assets/scripts/cardsDataRebuilder.js';
import getData from '../../assets/scripts/getData.js';
import shuffleData from '../../assets/scripts/shuffleData.js';
import LoadingElement from '../../assets/scripts/loading-element.js';
import Pagination from '../../assets/scripts/pagination.js';

const loadingElement = new LoadingElement();

document.querySelector('.carousel__container').appendChild(loadingElement.content);

loadingElement.initAnimation();
getData(loadingElement)
  .then(data => cardsDataRebuilder(data))
  .then(data => shuffleData(data))
  .then(data => new Pagination(data))

document.querySelector('.header__btn-menu').addEventListener('click', menuHandler);