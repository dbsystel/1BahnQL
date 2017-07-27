class ParkingspaceLoaderMock {
  constructor() {
    this.parkingspaceMockResult;
    this.occupancyMockResult;
  }

  spaceById(spaceId) {
    this.spaceId = spaceId;
    return Promise.resolve(this.parkingspaceMockResult);
  }

  occupancyForId(spaceId) {
    this.spaceId = spaceId;
    return Promise.resolve(this.occupancyMockResult);
  }

  spacesForStationNumber(stationNumber) {
    this.stationNumber = stationNumber;
    return Promise.resolve(this.parkingspaceMockResult);
  }

  nearbyParkingspaces(latitude, longitude, radius) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.radius = radius;
    return Promise.resolve(this.parkingspaceMockResult);
  }
}

module.exports = ParkingspaceLoaderMock;
