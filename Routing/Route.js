const RoutePart = require("./RoutePart.js");

class Route {
	constructor(data) {
		this.parts = data.parts.map(element => new RoutePart(element))
	}

}

module.exports = Route
