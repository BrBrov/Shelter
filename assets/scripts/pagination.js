import PaginationView from './paginationPages.js';

class PaginationHandler {
  constructor(paginationView) {
    this.paginationView = paginationView;
    this._addResizeHandler();
  }

  _addResizeHandler() {
    window.addEventListener('resize', function () {
      this.paginationView.updateCurrentWidth();
      this.paginationView.setPaginationData();
    }.bind(this));
  }
}

class Pagination extends PaginationHandler {
  constructor(cardsData) {
    super(new PaginationView(cardsData));
    this.container = document.querySelector('.carousel__container');
    const buttons = document.querySelectorAll('.main__contorllers-button');

    this.btnToStart = buttons[0];
    this.btnPrevPage = buttons[1];
    this.btnIndicate = buttons[2];
    this.btnNextPage = buttons[3];
    this.btnToEnd = buttons[4];

    this._initPagination();
  }

  _initPagination() {
    console.dir(this.paginationView);
  }
}

export default Pagination;