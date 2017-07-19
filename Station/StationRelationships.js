const loadElevatorFor = require('../facilities.js');
const {
  getParkingSpacesByBhfNr,
} = require('../ParkingSpaceQuery');

class StationRelationships {
  constructor(station, timeTableServcie) {
    station.facilities = function () {
      return loadElevatorFor(station.stationNumber);
    };

    station.timetable = function () {
      return timeTableServcie.timetableForEvaId(station.primaryEvaId);
    };

    station.parkingSpaces = function () {
      return getParkingSpacesByBhfNr(station.stationNumber);
    };
  }
}

module.exports = StationRelationships;
