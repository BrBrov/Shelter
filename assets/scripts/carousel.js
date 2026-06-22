import CardElement from './cardElement.js';
import CardsContainer from './cardsContainer.js';
import shuffleData from './shuffleData.js';

class CarouselData {
  constructor(cardsData) {
    this.cardsData = cardsData;
    this.currentCardsIDs = [];
  }
}

class CarouselController extends CarouselData {
  constructor(cardsData) {
    super(cardsData);
  }

  generateNewCardsIDs() {
    let clearCards = this.cardsData.filter((card) => {
      return !this.currentCardsIDs.includes(card.id);
    });
    clearCards = shuffleData(clearCards);

    clearCards = clearCards.slice(0, 3);

    this.currentCardsIDs = clearCards.map(function (card) {
      return card.id;
    });


    return clearCards.map(dataCard => new CardElement(dataCard));
  }
}

class CarouselHandler extends CarouselController {
  constructor(cardsData) {
    super(cardsData);
    this.isRotate = false;
  }

  rotateNext(container) {
    console.dir(container);
  }

  rotatePrev(container) {
    console.dir(container);
  }

  checkRotate() {
    return this.isRotate;
  }

  switchRotateState() {
    if (this.isRotate) {
      return this.isRotate = false;
    }

    return this.isRotate = true;
  }
}

class Carousel extends CarouselHandler {
  constructor(cardsData) {
    super(cardsData);
    this.prevBtn = document.querySelector('.carousel__btn-prev');
    this.nextBtn = document.querySelector('.carousel__btn-next');
    this.cardsContainer = this.setContainer();
  }

  init() {
    const cardsElems = this.cardsData.map(cardData => new CardElement(cardData));
    cardsElems.push(new CardElement(this.cardsData[0]));

    this.cardsContainer = new CardsContainer(cardsElems, this.cardsContainer).container;
    this.setCurrentIDs();
    this.prevBtn.addEventListener('click', this.prevHandler.bind(this));
    this.nextBtn.addEventListener('click', this.nextHandler.bind(this));
  }

  prevHandler() {
    if (this.checkRotate()) return;
    this.switchRotateState();
    this.rotatePrev(this.cardsContainer);
    this.cardsContainer = this.setContainer();
    setTimeout(() => {
      this.switchRotateState();
    }, 500);
  }

  nextHandler() {
    if (this.checkRotate()) return;
    this.switchRotateState();
    this.rotateNext(this.cardsContainer);
    setTimeout(() => {
      this.switchRotateState();
      this.cardsContainer = this.setContainer();
    }, 500);
  }

  setCurrentIDs() {
    this.currentCardsIDs = [];
    const viewSlide = this.cardsContainer.querySelectorAll('.carousel__slide')[1];
    const cards = viewSlide.querySelectorAll('.carousel__card');
    cards.forEach(card => this.currentCardsIDs.push(card.dataset.id));
  }

  setContainer() {
    return document.getElementsByClassName('carousel__container')[0];
  }
}

export default Carousel;