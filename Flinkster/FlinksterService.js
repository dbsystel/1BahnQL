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
    return this.flinksterLoader.nearbyFlinksters(1, latitude, longitude, radius, count, offset).then(flinksterCars => {
      if (flinksterCars.size > 0) {
        return flinksterCars.items.map(car => self.transformResultIntoFlinksterCar(car));
      }
      return [];
    });
  }

  nearbyFlinksterBikes(latitude, longitude, radius, count, offset) {
    const self = this;
    return this.flinksterLoader.nearbyFlinksters(2, latitude, longitude, radius, count, offset).then(flinksterBikes => {
      if (flinksterBikes.size > 0) {
        return flinksterBikes.items.map(bike => self.transformResultIntoFlinksterBike(bike));
      }
      return [];
    });
  }
}

module.exports = FlinksterService;
