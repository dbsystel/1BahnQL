class RouteRelationships {
  constructor(stationService) {
    this.stationService = stationService
  }

  resolve(route) {
    const stationService = this.stationService;
		route.from = () => {
			return stationService.stationByEvaId(route.parts[0].fromEvaId)
		}

		route.to = () => {
			return stationService.stationByEvaId(route.parts[route.parts.length - 1].toEvaId)
		}

		route.parts = route.parts.map((part) => {
			part.from = () => {
				return stationService.stationByEvaId(part.fromEvaId);
			}
			part.to = () => {
				return stationService.stationByEvaId(part.toEvaId);
			}
			return part
		})

		return route
  }
}

module.exports = RouteRelationships
