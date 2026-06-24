import PaginationContainer from './paginationContainer.js';
import PaginationView from './paginationPages.js';

class PaginationHandlerView {
  constructor(paginationView, container) {
    this.container = container;
    this.paginationView = paginationView;
    this.isRotate = true;
    this._addResizeHandler();
  }

  _cleanPagination() {
    [...this.container.children].forEach(slide => slide.remove());
  }

  _buildPaginationSlides() {
    const notVisibleSlide = new PaginationContainer(this.paginationView.pages.slice(0, 1)[0]);

    this.container.appendChild(notVisibleSlide.container.cloneNode(true));

    const paginationSlides = this.paginationView.pages.map(page => new PaginationContainer(page));
    paginationSlides.forEach(slide => this.container.appendChild(slide.container));

    this.container.appendChild(notVisibleSlide.container.cloneNode(true));
  }

  _switchRotateState() {
    return this.isRotate = (this.isRotate) ? false : true;
  }
}

class PaginationInit extends PaginationHandlerView {
  constructor(cardsData) {
    super(new PaginationView(cardsData), document.querySelector('.carousel__container'));
    this._initPagination();
  }

  _initPagination() {
    this._buildPaginationSlides(this.container);
    this._switchRotateState();
  }

  _rotatePosition(position) {
    const rule = Array.from(this.paginationView.position.cssRules).find(r => r.selectorText === '.carousel__pagination_position');
    if (rule) {
      rule.style.transform = `translate(-${position}%)`;
    }
  }
}

class Pagination extends PaginationInit {
  constructor(cardsData) {
    super(cardsData);

    this.modificators = {
      disactive: 'main__contorllers-button_disabled',
      active: 'main__contorllers-button_active'
    };

    const position = -100;

    const buttons = document.querySelectorAll('.main__contorllers-button');
    console.dir(buttons);
    this.btnToStart = buttons[0];
    this.btnPrevPage = buttons[1];
    this.btnIndicate = buttons[2];
    this.btnNextPage = buttons[3];
    this.btnToEnd = buttons[4];

    this._addHandlersClick();
  }

  _rotatePrev() {
    if (this.isRotate) return;
    this._switchRotateState();
    const currentPage = this.paginationView.getPrevPage();

    const countTransform = currentPage * 100;

    this._rotatePosition(countTransform);

    setTimeout(() => this._updateBtnView(), 255);
    setTimeout(() => this._switchRotateState(), 510);
  }

  _rotateNext() {
    if (this.isRotate) return;
    this._switchRotateState();
    const currentPage = this.paginationView.getNextPage();

    const countTransform = currentPage * 100;

    this._rotatePosition(countTransform);
    setTimeout(() => this._updateBtnView(), 255);
    setTimeout(() => this._switchRotateState(), 510);
  }

  _rotateToFirstPage() {
    if (this.isRotate) return;
    this._switchRotateState();
    const countTransform = this.paginationView.toFirstPage() * 100;
    this._rotatePosition(countTransform);
    setTimeout(() => this._updateBtnView(), 255);
    setTimeout(() => this._switchRotateState(), 510);
  }

  _rotateToLastPage() {
    if (this.isRotate) return;
    this._switchRotateState();
    const countTransform = this.paginationView.toLastPage() * 100;
    this._rotatePosition(countTransform);
    setTimeout(() => this._updateBtnView(), 255);
    setTimeout(() => this._switchRotateState(), 510);
  }

  _updateBtnView() {
    const position = this.paginationView.currentPage;
    this.btnIndicate.textContent = position;

    if (position === 1) {
      this.btnToStart.classList.replace(this.modificators.active, this.modificators.disactive);
      this.btnToStart.disabled = true;
      this.btnPrevPage.classList.replace(this.modificators.active, this.modificators.disactive);
      this.btnPrevPage.disabled = true;

      this.btnToEnd.classList.replace(this.modificators.disactive, this.modificators.active);
      this.btnToEnd.disabled = false;
      this.btnNextPage.classList.replace(this.modificators.disactive, this.modificators.active);
      this.btnNextPage.disabled = false;
    }

    if (position === this.paginationView.pages.length) {
      this.btnToEnd.classList.replace(this.modificators.active, this.modificators.disactive);
      this.btnToEnd.disabled = true;
      this.btnNextPage.classList.replace(this.modificators.active, this.modificators.disactive);
      this.btnNextPage.disabled = true;

      this.btnToStart.classList.replace(this.modificators.disactive, this.modificators.active);
      this.btnToStart.disabled = false;
      this.btnPrevPage.classList.replace(this.modificators.disactive, this.modificators.active);
      this.btnPrevPage.disabled = false;
    }

    if (position > 1 && position < this.paginationView.pages.length) {
      this.btnToStart.classList.replace(this.modificators.disactive, this.modificators.active);
      this.btnToStart.disabled = false;
      this.btnPrevPage.classList.replace(this.modificators.disactive, this.modificators.active);
      this.btnPrevPage.disabled = false;

      this.btnToEnd.classList.replace(this.modificators.disactive, this.modificators.active);
      this.btnToEnd.disabled = false;
      this.btnNextPage.classList.replace(this.modificators.disactive, this.modificators.active);
      this.btnNextPage.disabled = false;
    }
  }

  _addResizeHandler() {
    window.addEventListener('resize', function () {
      this._rotateToFirstPage();
      this._switchRotateState();
      this.paginationView.updateCurrentWidth();
      this.paginationView.setPaginationData();
      this._cleanPagination();
      this._buildPaginationSlides();
      this._switchRotateState();
    }.bind(this));
  }

  _addHandlersClick() {
    this.btnPrevPage.addEventListener('click', this._rotatePrev.bind(this));
    this.btnNextPage.addEventListener('click', this._rotateNext.bind(this));
    this.btnToStart.addEventListener('click', this._rotateToFirstPage.bind(this));
    this.btnToEnd.addEventListener('click', this._rotateToLastPage.bind(this));
    this._addResizeHandler();
  }
}

export default Pagination;