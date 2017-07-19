class ParkingspaceRelationships {
  constructor(parkingsspaceService, stationService) {
    this.parkingsspaceService = parkingsspaceService;
    this.stationService = stationService;
  }

  resolve(parkingspace) {
    const parkingsspaceService = this.parkingsspaceService;
    const stationService = this.stationService;

    parkingspace.station = () => stationService.stationByBahnhofsnummer(parkingspace.parkraumBahnhofNummer);
    parkingspace.occupancy = () => parkingsspaceService.occupancyForSpaceId(parkingspace.id);
  }
}

module.exports = ParkingspaceRelationships;
