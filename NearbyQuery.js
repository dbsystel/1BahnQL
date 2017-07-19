const loadNearbyTravelCenter = require('./TravelCenterGeoQuery');
const loadNearbyBikes = require('./CallABike/CallABikeGeoQuery');


class NearbyQuery {
  constructor(latitude, longitude, nearbyStationService, parkingspaceService, flinksterService) {
    this.nearbyStationService = nearbyStationService;
    this.parkingspaceService = parkingspaceService;
    this.flinksterService = flinksterService;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  get parkingSpaces() {
    return this.parkingspaceService.nearbyParkingspaces(this.latitude, this.longitude);
  }

  get travelCenter() {
    return loadNearbyTravelCenter(this.latitude, this.longitude);
  }

  get flinksterCars() {
    return this.flinksterService.nearbyFlinksterCars(this.latitude, this.longitude);
  }

  get stations() {
  	return this.nearbyStationService.stationNearby(this.latitude, this.longitude, 5);
  }

  get bikes() {
    return loadNearbyBikes(this.lat, this.lon);
  }
}

module.exports = NearbyQuery;
