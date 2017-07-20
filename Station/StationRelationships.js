class StationRelationships {
  /**
	* A StationRelationships connects different datasources related to a station.
	* @constructor
	*/
  constructor(parkingSpaceService, facilityService, timeTableService) {
    this.parkingSpaceService = parkingSpaceService
    this.facilityService = facilityService
    this.timeTableService = timeTableService
  }

  resolve(station) {
    const parkingSpaceService = this.parkingSpaceService;
    const facilityService = this.facilityService;
    const timeTableService = this.timeTableService;

    station.parkingSpaces = function () {
      return parkingSpaceService.parkingspacesForStationNumber(station.stationNumber);
    };
    
    station.facilities = function () {
      return facilityService.facilitiesForStationNumber(station.stationNumber);
    };
    
    station.timetable = function () {
      return timeTableService.timetableForEvaId(station.primaryEvaId);
    };
  }
}

module.exports = StationRelationships;
