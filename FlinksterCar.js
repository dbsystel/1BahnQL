'use strict';

class FlinksterCar {

  constructor(car) {
    this.id = car.rentalObject.uid;
    this.name = car.rentalObject.name;
    this.description = car.rentalObject.description;
  }

}

module.exports = FlinksterCar;
