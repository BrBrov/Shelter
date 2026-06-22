import CardElement from './cardElement.js';
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

  getCurrentCardsIDs() {
    return this.cardsData.filter((card) => this.currentCardsIDs.includes(card.id));
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
  }
}

class CarouselHandler extends CarouselController {
  constructor(cardsData) {
    super(cardsData);
    this.isRotate = false;
  }

  rotateNext(carouselElements, idCard) {
    const newCardsElem = this.getCurrentCardsIDs();
    carouselElements[carouselElements.legth - 1].after(newCardsElem[idCard].cloneNode(true));
    carouselElements[0].remove();
  }

  rotatePrev(carouselElements, idCard) {
    const newCardsElem = this.getCurrentCardsIDs();
    console.dir(newCardsElem);
    carouselElements[0].prepend(newCardsElem[idCard].cloneNode(true));
    carouselElements[carouselElements.length - 1]
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
    this.cardsContainer = document.getElementsByClassName('carousel__container')[0];
    this.timer = null;
    this.ticks = 0;
  }

  init() {
    const cardsElems = this.cardsData.map(cardData => new CardElement(cardData));
    cardsElems.push(new CardElement(this.cardsData[0]));
    cardsElems.forEach(card => this.cardsContainer.appendChild(card.content));
    this.prevBtn.addEventListener('click', this.prevHandler.bind(this));
  }

  tickHandler(newTick) {
    this.ticks = newTick;
  }

  prevHandler() {
    if (this.checkRotate()) return;
    this.switchRotateState();
    this.timer = setInterval(() => {
      if (this.ticks < 3) {
        this.tickHandler(this.tick + 1);
        this.rotatePrev(this.cardsContainer, this.ticks);
      } else {
        clearInterval(this.timer);
        this.tickHandler(0);
        this.switchRotateState();
      }
    }, 500);
  }

  nextHandler() {
    if (this.checkRotate) return;
  }
}

export default Carousel;