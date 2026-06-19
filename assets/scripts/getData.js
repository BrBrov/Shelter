import shuffleData from './shuffleData.js';

function getData() {
  return fetch('../../assets/scripts/pets.json')
    .then(response => response.json());
}

export default getData;