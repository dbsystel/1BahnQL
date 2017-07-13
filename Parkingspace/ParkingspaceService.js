// Models
const Parkingspace = require('./Parkingspace');
const Occupancy = require('./Occupancy');

class ParkingspaceService {
  constructor(parkingspaceLoader) {
    this.parkingspaceLoader = parkingspaceLoader;
  }

  transformResultIntoParkingspace(jsonData) {
    if (jsonData) {
      return new Parkingspace(jsonData, this);
    }
  }

  transformResultIntoOccupancy(jsonData) {
    if (jsonData) {
      return new Occupancy(jsonData);
    }
  }

  transformResultIntoEvaId(jsonData) {
    if (jsonData) {
      const parkingStation = jsonData[0];
      return new Integer(parkingStation.evaNummer);
    }
  }

  parkingspaceBySpaceId(spaceId) {
    const self = this;
    return this.parkingspaceLoader.spaceById(spaceId).then(jsonData => self.transformResultIntoParkingspace(jsonData));
  }

  occupancyForSpaceId(spaceId) {
    const self = this;
    return this.parkingspaceLoader.occupancyForId(spaceId).then(jsonData => self.transformResultIntoOccupancy(jsonData));
  }

  evaIdForSpaceId(stationNumber) {
    const self = this;
    return this.parkingspaceLoader.evaIdForBhfNr(stationNumber).then(jsonData => self.transformResultIntoEvaId(jsonData));
  }
}

module.exports = ParkingspaceService;
