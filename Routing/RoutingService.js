const hafas = require('db-hafas')
const Route = require("./Route.js")

class RoutingService {

	constructor() {
		this.relationships;
	}

	routes(from, to) {
		const self = this
		return hafas.journeys(from + "", to + "")
		.then(result => result.map(element => self.relationships.resolve(new Route(element))))
	}
}

module.exports = RoutingService
