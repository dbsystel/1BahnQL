class ParkingspaceLoaderMock {
  constructor(result) {
    this.result = result;
  }

  spaceById(spaceId) {
    this.spaceId = spaceId;
    return Promise.resolve(this.result);
  }

  occupancyForId(spaceId) {
    this.spaceId = spaceId;
    return Promise.resolve(this.result);
  }

  spacesForStationNumber(stationNumber) {
    this.stationNumber = stationNumber;
    return Promise.resolve(this.result.items.filter(elem => elem.station.id === stationNumber));
  }

  nearbyParkingspaces(latitude, longitude, radius) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.radius = radius;
    return Promise.resolve(this.result);
  }
}

module.exports = ParkingspaceLoaderMock;
