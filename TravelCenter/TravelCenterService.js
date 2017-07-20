const TravelCenter = require('./TravelCenter');
class TravelCenterService {
  constructor(travelCenterLoader) {
    this.travelCenterLoader = travelCenterLoader
  }

  travelCenterAtLocation(latitude, longitude) {
    return this.travelCenterLoader.travelCenterAtLocation(latitude, longitude)
    .then(result => new TravelCenter(result));
  }
}

module.exports = TravelCenterService
