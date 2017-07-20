class StationRelationships {

  /**
	* A StationRelationships connects different datasources related to a station.
	* @constructor
	*/
  constructor(parkingSpaceService, facilityService, timeTableService, trackService) {
    this.parkingSpaceService = parkingSpaceService
    this.facilityService = facilityService
    this.timeTableService = timeTableService
    this.trackService = trackService;
  }

  resolve(station) {
    const parkingSpaceService = this.parkingSpaceService;
    const facilityService = this.facilityService;
    const timeTableService = this.timeTableService;
    const trackService = this.trackService;

    station.parkingSpaces = function () {
      return parkingSpaceService.parkingspacesForStationNumber(station.stationNumber);
    };

    station.facilities = function () {
      return facilityService.facilitiesForStationNumber(station.stationNumber);
    };
    
    station.timetable = function () {
      return timeTableService.timetableForEvaId(station.primaryEvaId);
    };
    
    station.tracks = function() {
  	  return trackService.tracksForStationNumber(station.stationNumber)
    }
    
  }
}

module.exports = StationRelationships;
