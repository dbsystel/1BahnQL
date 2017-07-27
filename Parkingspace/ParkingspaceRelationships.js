class ParkingspaceRelationships {
  constructor(parkingspaceService, stationService) {
    this.parkingspaceService = parkingspaceService;
    this.stationService = stationService;
  }

  resolve(parkingspace) {
    const parkingspaceService = this.parkingspaceService;
    const stationService = this.stationService;

    parkingspace.station = () => stationService.stationByBahnhofsnummer(parkingspace.stationId);
    parkingspace.occupancy = () => parkingspaceService.occupancyForSpaceId(parkingspace.id);
  }
}

module.exports = ParkingspaceRelationships;
