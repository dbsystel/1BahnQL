const loadNearbyTravelCenter = require('./TravelCenterGeoQuery');

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
    return this.flinksterService.nearbyFlinksterBikes(this.latitude, this.longitude);
  }
}

module.exports = NearbyQuery;
