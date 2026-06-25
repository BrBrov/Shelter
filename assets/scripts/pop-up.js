class Popup {
  constructor() {
    this.popover = document.querySelector('.popup');
    this.cardData = null;
    this._addHandler();
  }

  setCardData(cardData) {
    this.cardData = cardData;
  }

  _addHandler() {
    this.popover.addEventListener('beforetoggle', this._onOpenPopup.bind(this));
    const backdrop = this.popover.querySelector('.popup__backdrop');
    backdrop.addEventListener('click', this._onClosePopup.bind(this));

    const cardContainer = this.popover.querySelector('.popup__card');
    cardContainer.addEventListener('click', this._onClosePopup.bind(this));
  }

  _onOpenPopup({ target, newState }) {
    if (newState === 'open') {
      target.querySelector('.popup__title').textContent = this.cardData.name;
      target.querySelector('.popup__image').src = this.cardData.img;
      target.querySelector('.popup__image').alt = this.cardData.name;
      target.querySelector('.popup__info').textContent = `${this.cardData.type} - ${this.cardData.bree}`;
      target.querySelector('.popup__description').textContent = this.cardData.description;
      const params = target.querySelectorAll('.popup__item-text');
      params[0].textContent = this.cardData.age;
      params[1].textContent = this.cardData.inoculations.join(', ');
      params[2].textContent = this.cardData.diseases.join(', ');
      params[3].textContent = this.cardData.parasites.join(', ');
    } else {
      this.cardData = null;
    }
  }

  _onClosePopup({ target }) {
    if (target.className === 'popup__backdrop' || target.className === 'popup__card') {
      this.popover.hidePopover();
    }
  }
}
export default Popup;