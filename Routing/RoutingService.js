const hafas = require('db-hafas')
const Route = require("./Route.js")

class RoutingService {

	constructor() {
	}

	routes(from, to) {
		const self = this
		return hafas.routes(from, to)
		.then(result => result.map(element => self.relationships.resolve(new Route(element))))
	}
}

module.exports = RoutingService
