class CardsContainer {
  constructor(cards, container) {
    this.container = container;
    this._createContainer(cards);
  }

  getSlides() {
    return this.container.children;
  }

  _createContainer(cards) {
    let ctrlArr = [];
    const cardsSlides = cards.reduce((resultArr, card) => {
      ctrlArr.push(card);

      if (ctrlArr.length === 3) {
        resultArr.push(ctrlArr);
        ctrlArr = [];
        return resultArr;
      }

      return resultArr;
    }, []);

    cardsSlides.forEach(slide => {
      const slideContainer = this._createCardSlide();
      slide.forEach(card => slideContainer.appendChild(card.content));

      this.container.appendChild(slideContainer);
    });
    
  }

  _createCardSlide() {
    const slide = document.createElement('div');
    slide.className = 'carousel__slide';
    return slide;
  }
}
export default CardsContainer;