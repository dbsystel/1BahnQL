const loadElevatorFor = require('../facilities.js');

class StationRelationships {
  constructor(parkingSpaceService, timeTableServcie) {
    this.parkingSpaceService = parkingSpaceService
    this.timeTableServcie = timeTableServcie
  }

  resolve(station) {
    const parkingSpaceService = this.parkingSpaceService;
    const timeTableServcie = this.timeTableServcie;

    station.facilities = function () {
      return loadElevatorFor(station.stationNumber);
    };

    station.timetable = function () {
      return timeTableServcie.timetableForEvaId(station.primaryEvaId);
    };

    station.parkingSpaces = function () {
      return parkingSpaceService.parkingspacesForStationNumber(station.stationNumber);
    };
  }
}

module.exports = StationRelationships;
