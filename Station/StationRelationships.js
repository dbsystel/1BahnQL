const loadElevatorFor = require('../facilities.js');
const {
  getParkingSpacesByBhfNr,
} = require('../ParkingSpaceQuery');
const {
  loadTimeTableFor,
} = require('../timetables.js');
const {
  stationNumberByEvaId,
} = require('./StationIdMappingService.js');

class StationRelationships {
  constructor(station) {
    station.facilities = function () {
      return loadElevatorFor(station.stationNumber);
    };

    station.arrivalDepatureBoard = function () {
      return loadTimeTableFor(station.primaryEvaId);
    };

    station.parkingSpaces = function () {
      return getParkingSpacesByBhfNr(station.stationNumber);
    };
  }
}

module.exports = StationRelationships;
