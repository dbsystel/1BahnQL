const Route = require("./Route.js");
const createHafas = require('db-hafas');
const hafas = createHafas('routing-service');

class RoutingService {

	routes(from, to) {
		return hafas.journeys(from + "", to + "")
			.then(result => result.journeys.map(element => new Route(element)));
	}

}

module.exports = RoutingService;
