class StationLoaderMock {
  constructor(result) {
     this.result = result
   }

  stationByBahnhofsnummer(stationNumber) {
    this.stationNumber = stationNumber
    return Promise.resolve(this.result);
  }

  stationByEvaId(evaId) {
    this.evaId = evaId
    return Promise.resolve(this.result);
  }

  stationByRil100(rill100) {
    this.rill100 = rill100
    return Promise.resolve(this.result);
  }

  searchStations(searchTerm) {
    this.searchTerm = searchTerm
    return Promise.resolve(this.result);
  }
}

module.exports = StationLoaderMock
