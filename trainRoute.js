const RoutePart = require("./routePart.js")

class Route {
	constructor(data) {
		this.data = data
	}
	
	parts() {
		return this.data.parts.map(function(element) { return new RoutePart(element)})
	}
	
}

module.exports = Route