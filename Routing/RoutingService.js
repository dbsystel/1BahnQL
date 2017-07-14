const hafas = require('db-hafas')
const Route = require("./Route.js")

class RoutingService {

	routes(from, to) {
		return hafas.routes(from, to)
		.then(result => result.map(element => new Route(element)))
	}
}

module.exports = RoutingService
