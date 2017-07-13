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
    return null;
  }

  transformResultIntoParkingspaces(jsonArray) {
    if (jsonArray) {
      const parkingspaces = jsonArray.map(space => transformResultIntoParkingspace(space));

      return [].concat(parkingspaces);
    }
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

  evaIdForSpaceId(stationNumber) {
    const self = this;
    return this.parkingspaceLoader.evaIdForStationNumber(stationNumber).then(jsonData => self.transformResultIntoEvaId(jsonData));
  }

  parkingspacesForStationNumber(stationNumber) {
    const self = this;
    return this.parkingspaceLoader.spacesForStationNumber(stationNumber).then(jsonArray => self.transformResultIntoParkingspaces(jsonArray));
  }
}

module.exports = ParkingspaceService;
