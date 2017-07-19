const access = require('safe-access');

const Location = require('../location');
const MailAddress = require('../mailAddress');
const FlinksterParkingArea = require('../FlinksterParkingArea');

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

class FlinksterBike {
  constructor(bike) {
    this.id = bike.rentalObject.uid;
    this.url = bike.rentalObject.href;
    this.name = bike.rentalObject.name;
    this.description = bike.rentalObject.description;
    this.rentalModel = bike.rentalObject.rentalModel;
    this.providerRentalObjectId = bike.rentalObject.providerRentalObjectId;
    this.type = bike.rentalObject.type;
    this.attributes = new Attributes(bike.rentalObject.attributes);
    this.location = new Location(bike.position.coordinates[0], bike.position.coordinates[1]);
    this.address = new MailAddress(bike.area.address.city, bike.area.address.zip, bike.area.address.street);
    this.priceOptions = bike.price.items.map(price => new PriceOption(price));
    this.parkingArea = new FlinksterParkingArea(bike.area);
    this.bookingUrl = access(bike, '_links[0].href');
  }
}

module.exports = FlinksterBike;
