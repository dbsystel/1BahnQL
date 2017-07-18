class StationLoaderMock {
  constructor(result) {
     this.result = result
   }

  stationByBahnhofsnummer(stationNumber) {
    this.stationNumber = stationNumber
    return Promise.resolve(this.result);
  }

  searchStations(searchTerm) {
    this.searchTerm = searchTerm
    return Promise.resolve(this.result);
  }
}

module.exports = StationLoaderMock
