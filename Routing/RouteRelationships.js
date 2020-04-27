class RouteRelationships {

  constructor(stationService) {
    this.stationService = stationService;
  }

  resolve(route) {
    // const stationService = this.stationService;

    // route.from = () => {
    //   return stationService.stationByEvaId(route.parts[0].fromEvaId);
    // }
    // route.to = () => {
    //   return stationService.stationByEvaId(route.parts[route.parts.length - 1].toEvaId);
    // }

    return route
  }
}

module.exports = RouteRelationships;
