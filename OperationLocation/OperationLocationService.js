const OperationLocation = require('./OperationLocation.js');

class OperationLocationService {
  constructor(operationLocationLoader) {
    this.operationLocationLoader = operationLocationLoader
  }

  searchOperationLocations(name) {
    return this.operationLocationLoader.search(name)
    .then(function(result) {
      return result.map(location => new OperationLocation(location) )
    })
  }
}

module.exports = OperationLocationService
