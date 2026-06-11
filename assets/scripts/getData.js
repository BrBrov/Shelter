import shuffleData from './shuffleData.js';

function getData() {
  return fetch('../../assets/scripts/pets.json')
    .then(response => response.json())
    .then(data => console.dir(shuffleData(data)));
}

export default getData;