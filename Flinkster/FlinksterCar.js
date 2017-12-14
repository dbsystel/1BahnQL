const access = require('safe-access');

const Location = require('../Location');
const MailAddress = require('../mailAddress');
const FlinksterParkingArea = require('../FlinksterParkingArea');

class Attributes {
  constructor(attributes) {
    this.seats = attributes.seats;
    this.transmissionType = attributes.transmissionType;
    this.doors = attributes.doors;
    this.color = attributes.colour;
    this.fuel = attributes.fuel;
    this.licensePlate = attributes.licenseplate;
    this.fillLevel = attributes.fillLevel;
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
    if (!equipment) { return; }

    this.cdPlayer = equipment.cdPlayer;
    this.emissionsStickers = equipment.emissionsStickers;
    this.childSeats = equipment.childSeats;
    this.airConditioning = equipment.airConditioning;
    this.navigationSystem = equipment.navigationSystem;
    this.roofRailing = equipment.roofRailing;
    this.particulateFilter = equipment.particulateFilte;
    this.audioInline = equipment.audioInlin;
    this.tyreType = equipment.tyreType;
    this.bluetoothHandsFreeCalling = equipment.bluetoothHandsFreeCalling;
    this.cruiseControl = equipment.cruiseControl;
    this.passengerAirbagTurnOff = equipment.passengerAirbagTurnOff;
    this.isofixSeatFittings = equipment.isofixSeatFittings;
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
    this.location = new Location(car.position.coordinates[1], car.position.coordinates[0]);
    this.parkingArea = new FlinksterParkingArea(car.area);
    this.priceOptions = car.price.items.map(price => new PriceOption(price));
    this.url = car.rentalObject.href;
    this.category = access(car, 'rentalObject.category.href');
  }
}

module.exports = FlinksterCar;
