import shuffleData from './shuffleData.js';

function getData(loadingElement) {

  return fetch('../../assets/scripts/pets.json')
    .then(response => response.json())
    .then(data => shuffleData(data))
    .then(data => {
      loadingElement.deleteElement();
      loadingElement = null;
      return data;
    });
}

export default getData;