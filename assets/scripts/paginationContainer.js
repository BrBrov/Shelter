import CardElement from './cardElement.js';

class PaginationContainer {
  constructor(page) {
    this.container = this._createContainer(page);
  }

  _createContainer(page) {
    const container = document.createElement('div');
    container.className = 'carousel__pagination carousel__pagination_position';

    page.forEach(card => {
      container.appendChild(card.content)
    });

    return container;
  }
}

export default PaginationContainer;