const OperationLocation = require('./OperationLocation.js');

class OperationLocationService {
  constructor(operationLocationLoader) {
    this.operationLocationLoader = operationLocationLoader
  }

  searchOperationLocations(name) {
    return this.operationLocationLoader.search(name)
    .then(function(result) { new OperationLocation(result) })
  }
}

module.exports = OperationLocationService
