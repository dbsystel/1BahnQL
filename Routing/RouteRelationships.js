class RouteRelationships {
  constructor(stationService, trackService) {
    this.stationService = stationService;
    this.trackService = trackService;
  }

  resolve(route) {
    const stationService = this.stationService;
    const trackService = this.trackService;

    route.from = () => {
      return stationService.stationByEvaId(route.parts[0].fromEvaId);
    }
    route.to = () => {
      return stationService.stationByEvaId(route.parts[route.parts.length - 1].toEvaId);
    }

    route.parts = route.parts.map((part) => {
      part.from = () => {
        return stationService.stationByEvaId(part.fromEvaId);
			}
      part.to = () => {
        return stationService.stationByEvaId(part.toEvaId);
			}
      part.departingTrack = () => {
        return trackService.trackByEvaIdAndTrackNumber(part.fromEvaId, part.departingPlatformNumber);
      }
      part.arrivingTrack = () => {
        return trackService.trackByEvaIdAndTrackNumber(part.toEvaId, part.arrivingPlatformNumber);
      }

			return part
		})

		return route
  }
}

module.exports = RouteRelationships
