const hafas = require('db-hafas')
const TrainRoute = require("./trainRoute.js")

class TrainRouteSearch {
	constructor(from, to) {
		this.from = from
		this.to = to
		this.promise = hafas.routes(this.from, this.to)
	}
	
	get options() {
		return this.promise.then(function(result) { return result.map(function(element) { return new TrainRoute(element) }) })
	}
}

module.exports = TrainRouteSearch
