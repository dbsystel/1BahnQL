const RouteStop = require("./RouteStop.js");
const RouteLine = require("./RouteLine.js");

class RoutePart {
	constructor(route) {
		this.origin = new RouteStop(route.origin);
		this.destination = new RouteStop(route.destination);
		this.arrival = route.arrival;
		this.plannedArrival = route.plannedArrival;
		this.arrivalDelay = route.arrivalDelay;
		this.departure = route.departure;
		this.plannedDeparture = route.plannedDeparture;
		this.reachble = route.reachble;
		this.tripId = route.tripId;
		if(route.line)
			this.line = new RouteLine(route.line);
		this.direction = route.direction;
		this.arrivalPlatform = route.arrivalPlatform;
		this.plannedArrivalPlatform = route.plannedArrivalPlatform;
		this.departurePlatform = route.departurePlatform;
		this.plannedDeparturePlatform = route.plannedDeparturePlatform;
	}
}

module.exports = RoutePart;
