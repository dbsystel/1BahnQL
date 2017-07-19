// Models
const FlinksterCar = require('./FlinksterCar');

class FlinksterService {
  constructor(flinksterLoader) {
    this.flinksterLoader = flinksterLoader;
    this.relationships;
  }

  transformResultIntoFlinksterCar(jsonData) {
    if (jsonData) {
      const flinkster = new FlinksterCar(jsonData);
      // this.relationships.resolve(flinkster);
      return flinkster;
    }
    return null;
  }

  nearbyFlinksterCars(latitude, longitude) {
    const self = this;
    return this.flinksterLoader.nearbyFlinksterCars(latitude, longitude).then(flinksterCars => flinksterCars.map(car => self.transformResultIntoFlinksterCar(car)));
  }
}

module.exports = FlinksterService;
