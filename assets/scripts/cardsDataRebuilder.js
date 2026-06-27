import CardData from './cardData.js';

function cardsDataRebuilder(cards) {
  return cards.map(function(card, index) {
    return new CardData(index, card);
  });
}

export default cardsDataRebuilder;