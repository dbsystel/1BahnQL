// Models
const FlinksterCar = require('./FlinksterCar');
const FlinksterBike = require('./FlinksterBike');

class FlinksterService {
  constructor(flinksterLoader) {
    this.flinksterLoader = flinksterLoader;
    this.relationships;
  }

  transformResultIntoFlinksterCar(jsonData) {
    if (jsonData) {
      const car = new FlinksterCar(jsonData);
      // this.relationships.resolve(flinkster);
      return car;
    }
    return null;
  }

  transformResultIntoFlinksterBike(jsonData) {
    if (jsonData) {
      const bike = new FlinksterBike(jsonData);
      // this.relationships.resolve(flinkster);
      return bike;
    }
    return null;
  }

  nearbyFlinksterCars(latitude, longitude, radius, count, offset) {
    const self = this;
    return this.flinksterLoader.nearbyCars(latitude, longitude, radius, count, offset).then(flinksterCars => flinksterCars.map(car => self.transformResultIntoFlinksterCar(car)));
  }

  nearbyFlinksterBikes(latitude, longitude, radius, count, offset) {
    const self = this;
    return this.flinksterLoader.nearbyBikes(latitude, longitude, radius, count, offset).then(flinksterBikes => flinksterBikes.map(bike => self.transformResultIntoFlinksterBike(bike)));
  }
}

module.exports = FlinksterService;
