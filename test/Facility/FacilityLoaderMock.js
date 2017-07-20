class FacilityLoaderMock {
  constructor(result) {
    this.result = result
  }

  facilitiesForStationNumber(stationNumber) {
    this.stationNumber = stationNumber
    return Promise.resolve(this.result);
  }
}

module.exports = FacilityLoaderMock
