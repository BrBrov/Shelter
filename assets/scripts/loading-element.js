class LoadingElement {
  constructor() {
    this.loadingText = 'Loading...';
    this.content = this._initLodingView();
  }

  _initLodingView() {
    const lodingContainer = document.createElement('div');
    lodingContainer.className = 'cards__loading-container';

    const loadingText = document.createElement('p');
    loadingText.className = 'cards__loading-text';
    loadingText.textContent = this.loadingText;

    lodingContainer.append(loadingText);

    this._initCSSStylesLoading();

    return lodingContainer;
  }

  _initCSSStylesLoading() {
    const lodingViewCSSStyles = new CSSStyleSheet();

    lodingViewCSSStyles.insertRule('.cards__loading-container {display: flex; width: inherit; height: inherit; justify-content: center; align-items: center;}');

    const lodingViewCSSStylesText = new CSSStyleSheet();

    lodingViewCSSStylesText.insertRule('.cards__loading-text {width: 160px; font-size: 35px; font-style: normal; letter-spacing: 2.1px;}');

    document.adoptedStyleSheets = [...document.adoptedStyleSheets, lodingViewCSSStyles, lodingViewCSSStylesText];
  }

  initAnimation() {
    this.timer = setInterval(() => {
      const loadingText = document.querySelector('.cards__loading-text');
      console.log(this.loadingText.length);

      if (this.loadingText.length >= 10) {
        this.loadingText = 'Loading';
        return loadingText.textContent = this.loadingText;
      }

      this.loadingText = this.loadingText + '.';
      
      return loadingText.textContent = this.loadingText;
    }, 500);
  }

  deleteElement() {
    clearInterval(this.timer);
    this.content.remove();
  }
}

export default LoadingElement;