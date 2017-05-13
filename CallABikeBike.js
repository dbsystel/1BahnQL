'use strict';

const Location = require('./location');
const MailAddress = require('./mailAddress');

class Attributes {
  constructor(att) {
    this.licensePlate = att.licenseplate;
  }
}

class PriceOption {

  constructor(price) {
    this.interval = price.interval;
    this.type = price.type;
    this.grossamount = price.grossamount;
    this.currency = price.currency;
    this.taxrate = price.taxrate;
    this.preferredprice = price.preferredprice;
  }
}

class CallABikeBike {

  constructor(bike) {
    this.id = bike.rentalObject.uid;
    this.name = bike.rentalObject.name;
    this.description = bike.rentalObject.description;
    this.rentalModel = bike.rentalObject.rentalModel;
    this.type = bike.rentalObject.type;
    this.attributes = new Attributes(bike.rentalObject.attributes);
    this.location = new Location(bike.area.geometry.position.coordinates[0], bike.area.geometry.position.coordinates[1]);
    this.address = new MailAddress(bike.area.address.city, bike.area.address.zip, bike.area.address.street);
    this.priceOptions = bike.price.items.map(price => new PriceOption(price));
  }

}

module.exports = CallABikeBike;
