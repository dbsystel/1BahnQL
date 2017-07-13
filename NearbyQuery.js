const loadParkingSpaceByGeo = require('./Parkingspace/ParkingSpaceGeoQuery');
const loadNearbyTravelCenter = require('./TravelCenterGeoQuery');
const loadNearbyCars = require('./FlinksterGeoQuery');
const { stationNearby } = require('./station');
const loadNearbyBikes = require('./CallABikeGeoQuery');

class NearbyQuery {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }

  get parkingSpaces() {
    return loadParkingSpaceByGeo(this.lat, this.lon);
  }

  get travelCenter() {
    return loadNearbyTravelCenter(this.lat, this.lon);
  }

  get flinksterCars() {
    return loadNearbyCars(this.lat, this.lon);
  }

  get stations() {
  	return stationNearby(this.lat, this.lon);
  }

  get bikes() {
    return loadNearbyBikes(this.lat, this.lon);
  }
}

module.exports = NearbyQuery;
