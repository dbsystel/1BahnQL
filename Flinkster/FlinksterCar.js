const access = require('safe-access');

const Location = require('../location');
const MailAddress = require('../mailAddress');
const FlinksterParkingArea = require('../FlinksterParkingArea');

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

class CarEquipment {
  constructor(equipment) {
    this.cdPlayer = access(equipment, 'cdPlayer');
    this.emissionsStickers = access(equipment, 'emissionsStickers');
    this.childSeats = access(equipment, 'childSeats');
    this.airConditioning = access(equipment, 'airConditioning');
    this.navigationSystem = access(equipment, 'navigationSystem');
    this.roofRailing = access(equipment, 'roofRailing');
    this.particulateFilter = access(equipment, 'particulateFilter');
    this.audioInline = access(equipment, 'audioInline');
    this.tyreType = access(equipment, 'tyreType');
    this.bluetoothHandsFreeCalling = access(equipment, 'bluetoothHandsFreeCalling');
    this.cruiseControl = access(equipment, 'cruiseControl');
    this.passengerAirbagTurnOff = access(equipment, 'passengerAirbagTurnOff');
    this.isofixSeatFittings = access(equipment, 'isofixSeatFittings');
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
    this.equipment = new CarEquipment(car.rentalObject.equipment);
    this.location = new Location(car.position.coordinates[0], car.position.coordinates[1]);
    this.parkingArea = new FlinksterParkingArea(car.area);
    this.priceOptions = car.price.items.map(price => new PriceOption(price));
    this.url = car.rentalObject.href;
    this.category = car.rentalObject.category.href;
  }
}

module.exports = FlinksterCar;
