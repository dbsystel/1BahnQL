'use strict';

// Models
const Parkingspace = require('./Parkingspace')

class ParkingspaceService {

  constructor(parkingspaceLoader) {
    this.parkingspaceLoader = parkingspaceLoader
  }

  transformResultIntoParkingspace(jsonData) {
    if(jsonData) {
      return new Parkingspace(jsonData)
    }
  }

  parkingspaceBySpaceId(spaceId) {
    let parkingspaceLoader = this.parkingspaceLoader
    return parkingspaceLoader.parkingspaceBySpaceId(spaceId)
    .then(this.transformResultIntoParkingspace)
  }

}

module.exports = ParkingspaceService
 