// Models
const Parkingspace = require('./Parkingspace');
const Occupancy = require('./Occupancy');

class ParkingspaceService {
  constructor(parkingspaceLoader) {
    this.parkingspaceLoader = parkingspaceLoader;
    this.relationships;
  }

  transformResultIntoParkingspace(jsonData) {
    if (jsonData) {
      const parkingspace = new Parkingspace(jsonData, this);
      this.relationships.resolve(parkingspace)
      return parkingspace;
    }
    return null;
  }

  transformResultIntoParkingspaces(jsonArray) {
    const self = this;
    return (jsonArray || []).map(space => self.transformResultIntoParkingspace(space));
  }

  transformResultIntoOccupancy(jsonData) {
    if (jsonData) {
      return new Occupancy(jsonData);
    }
    return null;
  }

  transformResultIntoEvaId(jsonData) {
    if (jsonData) {
      const parkingStation = jsonData[0];
      return parkingStation.evaNummer;
    }
    return null;
  }

  parkingspaceBySpaceId(spaceId) {
    const self = this;
    return this.parkingspaceLoader.spaceById(spaceId).then(jsonData => self.transformResultIntoParkingspace(jsonData));
  }

  occupancyForSpaceId(spaceId) {
    const self = this;
    return this.parkingspaceLoader.occupancyForId(spaceId).then(jsonData => self.transformResultIntoOccupancy(jsonData));
  }

  parkingspacesForStationNumber(stationNumber) {
    const self = this;
    return this.parkingspaceLoader.spacesForStationNumber(stationNumber).then(jsonArray => self.transformResultIntoParkingspaces(jsonArray));
  }
}

module.exports = ParkingspaceService;
