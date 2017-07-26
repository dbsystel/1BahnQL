const VehicleProduct = require("./VehicleProduct.js");

class RoutePart {
	constructor(route) {
		this.delay = route.delay || 0;
		this.direction = route.direction;
		this.start = route.start;
		this.end = route.end;
		this.product = new VehicleProduct(route.product);
		this.fromEvaId = route.from.id;
		this.toEvaId = route.to.id;
		this.arrivingPlatformNumber = route.to.platform;
		this.departingPlatformNumber = route.from.platform;
	}
}

module.exports = RoutePart;
