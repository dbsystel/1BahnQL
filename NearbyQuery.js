const loadParkingSpaceByGeo = require('./Parkingspace/ParkingSpaceGeoQuery');
const loadNearbyTravelCenter = require('./TravelCenterGeoQuery');
const loadNearbyCars = require('./FlinksterGeoQuery');
const loadNearbyBikes = require('./CallABikeGeoQuery');


class NearbyQuery {
  constructor(latitude, longitude, nearbyStationService) {
    this.nearbyStationService = nearbyStationService;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  get parkingSpaces() {
    return loadParkingSpaceByGeo(this.latitude, this.longitude);
  }

  get travelCenter() {
    return loadNearbyTravelCenter(this.latitude, this.longitude);
  }

  get flinksterCars() {
    return loadNearbyCars(this.latitude, this.longitude);
  }

  get stations() {
  	return this.nearbyStationService.stationNearby(this.latitude, this.longitude, 5);
  }

  get bikes() {
    return loadNearbyBikes(this.lat, this.lon);
  }
}

module.exports = NearbyQuery;
