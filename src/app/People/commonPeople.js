const AbstractPeople = require("./abstractPeople");
const {swapiFunctions} = require("../index");
class CommonPeople extends AbstractPeople {
  constructor(id) {
    super(id)
    this.id = id;
    this.name = null;
    this.mass = null;
    this.height = null;
    this.homeworldName = null;
    this.homeworlId = null;
  }

  async init() {
    const url = `https://swapi.dev/api/people/${this.id}`;
    const body = await swapiFunctions.genericRequest(url, 'GET', null)

    this.name = Boolean(body.name) ? body.name : '';
    this.mass = Boolean(body.mass) ? body.mass : '';
    this.height = Boolean(body.height) ? body.height : '';
    this.homeworlId = '';
    this.homeworldName = '';
  }
}

module.exports = CommonPeople;