function shuffleData(array) {
  const newArray = [];
  const ctrlSet = new Set();

  while (newArray.length !== array.length) {
    const rndIndex = randomNumber(array.length);

    if (!ctrlSet.has(rndIndex)) {
      newArray.push(array[rndIndex]);
      ctrlSet.add(rndIndex);
    }
  }

  return newArray;
}

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

export default shuffleData;