class InitCardElement {
  _initElemnt(cardData) {
    const card = this._createElement('div');
    card.className = 'carousel__card';
    card.dataset.id = cardData.id;

    const cardImg = this._createElement('img');
    cardImg.className = 'carousel__card-image';
    cardImg.src = cardData.img;
    cardImg.alt = cardData.name;

    const cardHeader = this._createElement('h3');
    cardHeader.className = 'carousel__card-title';
    cardHeader.textContent = cardData.name;

    const cardButton = this._createElement('button');
    cardButton.className = 'carousel__card-button';
    cardButton.textContent = 'Learn more';

    card.appendChild(cardImg);
    card.appendChild(cardHeader);
    card.appendChild(cardButton);

    return card;
  }

  _createElement(tag) {
    return document.createElement(tag);
  }
}

class CardElement extends InitCardElement {
  constructor(cardData) {
    super();
    this.id = cardData.id;
    this.content = this._initElemnt(cardData);
  }
}

export default CardElement;