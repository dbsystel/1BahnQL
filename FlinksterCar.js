'use strict';

const Location = require('./location');
const MailAddress = require('./mailAddress');

class Attributes {

  constructor(att) {
    this.seats = att.seats;
    this.transmissionType = att.transmissionType;
    this.doors = att.doors;
    this.color = att.colour;
    this.fuel = att.fuel;
    this.licensePlate = att.licenseplate;
    this.fillLevel = att.fillLevel;
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

class FlinksterCar {

  constructor(car) {
    this.id = car.rentalObject.uid;
    this.name = car.rentalObject.name;
    this.description = car.rentalObject.description;
    this.rentalModel = car.rentalObject.rentalModel;
    this.type = car.rentalObject.type;
    this.attributes = new Attributes(car.rentalObject.attributes);
    this.location = new Location(car.position.coordinates[0], car.position.coordinates[1]);
    this.address = new MailAddress(car.area.address.city, car.area.address.zip, car.area.address.street);
    this.priceOptions = car.price.items.map(price => new PriceOption(price));
  }

}

module.exports = FlinksterCar;
