const VehicleProduct = require("./VehicleProduct.js");

class RoutePart {
	constructor(route) {
		this.delay = route.delay || 0;
		this.direction = route.direction;
		this.start = route.start;
		this.end = route.end;
		this.product = new VehicleProduct(route.line);
		this.fromEvaId = route.origin.id;
		this.toEvaId = route.destination.id;
		this.arrivingPlatformNumber = route.arrivalPlatform;
		this.departingPlatformNumber = route.departurePlatform;
	}
}

module.exports = RoutePart;
