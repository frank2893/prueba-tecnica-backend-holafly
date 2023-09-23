const AbstractPeople = require("./abstractPeople");
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
}

module.exports = CommonPeople;