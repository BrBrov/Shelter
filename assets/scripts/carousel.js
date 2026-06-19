import shuffleData from './shuffleData.js';

class CarouselData {
  constructor(cardsData) {
    this.cardsData = cardsData;
    this.currentCardsIDs = [0, 1, 2];
  }
}

class CarouselController extends CarouselData {
  constructor(cardsData) {
    super(cardsData);
  }

  getCurrentCards() {
    return this.cardsData.filter((card) => this.currentCardsIDs.includes(card.id));
  }

  generateNewCards() {
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
    const newCardsElem = this.getCurrentCards();
    carouselElements[carouselElements.legth - 1].after(newCardsElem[idCard].cloneNode(true));
    carouselElements[0].remove();
  }

  rotatePrev(carouselElements, idCard) {
    const newCardsElem = this.getCurrentCards();
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
    this.cardsElems = document.getElementsByClassName('carousel__card');
    this.timer = null;
    this.ticks = 0;
  }

  init() {
    this.generateNewCards();
    this.prevBtn.addEventListener('click', this.prevHandler.bind(this));
  }

  tickHandler(newTick) {
    this.ticks = newTick;
  }

  prevHandler() {
    if (this.checkRotate()) return;
    this.checkRotate = true;
    this.timer = setInterval(() => {
      if (this.ticks < 3) {
        this.tickHandler(this.tick + 1);
        this.rotatePrev(this.cardsElems, this.ticks);
      } else {
        clearInterval(this.timer);
        this.tickHandler(0);
        this.isRotate = false;
      }
    }, 500);
  }

  nextHandler() {
    if (this.checkRotate) return;
  }
}

export default Carousel;