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

    while (this.pages.length < 6) {
      const shuffledData = shuffleData(cardsData);

      if (prevCardsData[0].id !== shuffledData[0].id && prevCardsData[3].id !== shuffledData[3].id) {
        prevCardsData = shuffledData;
        this.pages.push(this.createCards(prevCardsData));
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

    while (this.pages.length < 8) {
      const shuffledData = shuffleData(cardData).slice(0, 6);

      if (prevCards[0].id !== shuffledData[0].id && prevCards[2].id !== shuffledData[2].id && prevCards[4].id !== shuffledData[4].id) {
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

    while (this.pages.length < 16) {
      const shuffledData = shuffleData(cardData).slice(0, 3);

      if (prevCards[0].id !== shuffledData[0].id && prevCards[1].id !== shuffledData[1].id && prevCards[2].id !== shuffledData[2].id) {
        prevCards = shuffledData;
        this.pages.push(this.createCards(prevCards));
      }
    }
  }
}

class PaginationData {
  constructor() {
    this.currentPage = 1;
    this.pages = [];

    this.position = new CSSStyleSheet();

    this.position.replace(`.carousel__pagination_position {transform: translate(-100%)`);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, this.position];
  }

  setPages(pages) {
    this.pages = [...pages];
  }

  getNextPage() {
    this.currentPage += 1;

    if (this.currentPage > this.pages.length) {
      return this.currentPage -= 1;
    };

    return this.currentPage;
  }

  getPrevPage() {
    this.currentPage -= 1;

    if (this.currentPage < 1) {
      return this.currentPage = 1;
    }

    return this.currentPage;
  }

  toFirstPage() {
    this.currentPage = 1;
    return this.currentPage;
  }

  toLastPage() {
    this.currentPage = this.pages.length;
    return this.currentPage;
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