class NearbyQuery {
  constructor(latitude, longitude, radius, nearbyStationService, parkingspaceService, flinksterService, travelCenterService) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.radius = radius;
    //Service Dependencies
    this.nearbyStationService = nearbyStationService;
    this.parkingspaceService = parkingspaceService;
    this.flinksterService = flinksterService;
    this.travelCenterService = travelCenterService;
  }

  parkingSpaces(args) {
    return this.parkingspaceService.nearbyParkingspaces(this.latitude, this.longitude, this.radius, args.count, args.offset);
  }

  get travelCenter() {
    return this.travelCenterService.travelCenterAtLocation(this.latitude, this.longitude, this.radius);
  }

  flinksterCars(args) {
    return this.flinksterService.nearbyFlinksterCars(this.latitude, this.longitude, this.radius, args.count, args.offset);
  }

  stations(args) {
  	return this.nearbyStationService.stationNearby(this.latitude, this.longitude, this.radius, args.count, args.offset);
  }

  bikes(args) {
    return this.flinksterService.nearbyFlinksterBikes(this.latitude, this.longitude, this.radius, args.count, args.offset);
  }
}

module.exports = NearbyQuery;
