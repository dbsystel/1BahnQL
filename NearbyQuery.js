const loadNearbyCars = require('./FlinksterGeoQuery');
const loadNearbyBikes = require('./CallABikeGeoQuery');


class NearbyQuery {
  constructor(latitude, longitude, nearbyStationService, parkingspaceService, travelCenterService) {
    this.nearbyStationService = nearbyStationService;
    this.parkingspaceService = parkingspaceService;
    this.travelCenterService = travelCenterService;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  get parkingSpaces() {
    return this.parkingspaceService.nearbyParkingspaces(this.latitude, this.longitude);
  }

  get travelCenter() {
    return this.travelCenterService.travelCenterAtLocation(this.latitude, this.longitude);
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
