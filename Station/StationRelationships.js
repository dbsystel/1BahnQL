const loadElevatorFor = require('../facilities.js');

const {
  loadTimeTableFor,
} = require('../timetables.js');
const {
  stationNumberByEvaId,
} = require('./StationIdMappingService.js');

class StationRelationships {
  constructor(parkingSpaceService) {
    this.parkingSpaceService = parkingSpaceService
  }

  resolve(station) {

    const parkingSpaceService = this.parkingSpaceService

    station.facilities = function () {
      return loadElevatorFor(station.stationNumber);
    };

    station.arrivalDepatureBoard = function () {
      return loadTimeTableFor(station.primaryEvaId);
    };

    station.parkingSpaces = function () {
      return parkingSpaceService.parkingspacesForStationNumber(station.stationNumber);
    };
  }
}

module.exports = StationRelationships;
