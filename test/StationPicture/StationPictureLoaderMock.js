class StationPictureLoaderMock {
  constructor(result) {
    this.result = result;
  }

  stationPictureForStationNumber(stationNumber) {
    this.stationNumber = stationNumber;
    return Promise.resolve(this.result);
  }
}

module.exports = StationPictureLoaderMock;
