import shuffleData from './shuffleData.js';
import CardElement from './cardElement.js';
import CardData from './cardData.js';

class PaginationCardsCreator {
  createCards(cardsData) {
    return cardsData.map((card, id) => {
      const cardData = new CardData(card, id);
      return new CardElement(card);
    })
  }
}

class BigPagePaginationCreate extends PaginationCardsCreator {
  constructor(cardsData) {
    super();
    this.pages = [];
    this._createPages(cardsData);
  }

  _createPages(cardsData) {
    this.pages.push(this.createCards(cardsData));
    let prevCardsData = cardsData;

    while (this.pages.lenth < 6) {
      const shuffledCards = shuffleData(cardsData);
            console.log(this.pages);

      if (prevCardsData[0] !== shuffledData[0] && prevCardsData[3] !== shuffledData[3]) {
        this.pages.push(this.createCards(shuffledCards));
        prevCardsData = shuffledCards;
      }
    }
  }
}

class MediumPagePaginationCreate extends PaginationCardsCreator {
  constructor(cardsData) {
    super();
    this.pages = [];
    this._createPages(cardsData);
  }

  _createPages(cardData) {
    let prevCards = cardData.slice(0, 6);
    this.pages.push(this.createCards(prevCards));

    while (this.pages.lenth < 8) {
      const shuffledData = shuffleData(cardData).slice(0, 6);

      if (prevCards[0] !== shuffledData[0] && prevCards[3] !== shuffledData[3] && prevCards[6] !== shuffledData[6]) {
        prevCards = shuffledData;
        this.pages.push(this.createCards(prevCards));
      }
    }
  }
}

class SmallPagePaginationCreate extends PaginationCardsCreator {
  constructor(cardsData) {
    super();
    this.pages = [];
    this._createPages(cardsData);
  }

  _createPages(cardData) {
    let prevCards = cardData.slice(0, 3);

    this.pages.push(this.createCards(prevCards));

    while (this.pages.lenth < 16) {
      const shuffledData = shuffleData(cardData).slice(0, 3);

      if (prevCards[0] !== shuffledData[0] && prevCards[1] !== shuffledData[1] && prevCards[3] !== shuffledData[3]) {
        prevCards = shuffledData;
        this.pages.push(this.createCards(prevCards));
      }
    }
  }
}

class PaginationData {
  constructor() {
    this.currentPage = 0;
    this.pages = [];
  }

  setPages(pages) {
    this.pages = [...pages];
  }

  getNextPage() {
    this.currentPage += 1;

    if (this.currentPage === this.pages.lenth) {
      this.currentPage -= 1;
      return null;
    };

    return this.pages[this.currentPage];
  }

  getPrevPage() {
    this.currentPage -= 1;

    if (this.currentPage < 0) {
      this.currentPage = 0;
      return null;
    }

    return this.pages[this.currentPage];
  }
}

class PaginationView extends PaginationData {
  constructor(cardsData) {
    super();
    this.curentWidth = window.innerWidth;
    this.cardsData = cardsData;
    this.setPaginationData(cardsData);
  }

  setPaginationData(cardsData) {
    if (this.curentWidth >= 1280) {
      return this.setPages(new BigPagePaginationCreate(this.cardsData).pages);
    }

    if (this.curentWidth <= 1280 && this.curentWidth >= 768) {
      return this.setPages(new MediumPagePaginationCreate(this.cardsData).pages);
    }

    return this.setPages(new SmallPagePaginationCreate(this.cardsData).pages);
  }

  updateCurrentWidth() {
    this.curentWidth = window.innerWidth;
  }
}

export default PaginationView;