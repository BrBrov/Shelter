import PaginationContainer from './paginationContainer.js';
import PaginationView from './paginationPages.js';

class PaginationHandler {
  constructor(paginationView, container) {
    this.container = container;
    this.paginationView = paginationView;
    this._addResizeHandler();
  }

  _addResizeHandler() {
    window.addEventListener('resize', function () {
      this.paginationView.updateCurrentWidth();
      this.paginationView.setPaginationData();
      this._cleanPagination();
      this._buildPaginationSlides();
    }.bind(this));
  }

  _cleanPagination() {
    [...this.container.children].forEach(slide => slide.remove());
  }

  _buildPaginationSlides() {
    // console.dir(this.paginationView.pages);
    const notVisibleSlide = new PaginationContainer(this.paginationView.pages.slice(0, 1)[0]);

    this.container.appendChild(notVisibleSlide.container.cloneNode(true));

    const paginationSlides = this.paginationView.pages.map(page => new PaginationContainer(page));
    paginationSlides.forEach(slide => this.container.appendChild(slide.container));

    this.container.appendChild(notVisibleSlide.container.cloneNode(true));
  }
}

class Pagination extends PaginationHandler {
  constructor(cardsData) {
    super(new PaginationView(cardsData), document.querySelector('.carousel__container'));
    const buttons = document.querySelectorAll('.main__contorllers-button');

    this.btnToStart = buttons[0];
    this.btnPrevPage = buttons[1];
    this.btnIndicate = buttons[2];
    this.btnNextPage = buttons[3];
    this.btnToEnd = buttons[4];

    this._initPagination();
  }

  _initPagination() {
    this._buildPaginationSlides(this.container);
    this._addResizeHandler();
  }


}

export default Pagination;