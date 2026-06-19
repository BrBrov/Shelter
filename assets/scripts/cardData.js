class CardData {
  constructor(id, card) {
    this.id = id;
    Object.assign(this, card);
  }
}

export default CardData;