const hafas = require('db-hafas')
const { graphql } = require('graphql');
const fetch = require("node-fetch")
const schema = require("./schema.js")
const stations = require('db-stations')
const express = require('express');
const graphqlHTTP = require('express-graphql');

class Route {
	constructor(from, to) {
		this.from = from
		this.to = to
		this.promise = hafas.routes(from, to).then(function(result) { return result[0] })
	}
	
	parts() {
		return this.promise.then(function(route) { return route.parts.map(function(element) {return new RoutePart(element)})})
	}
	
}

class RoutePart {
	
	constructor(data) {
		this.data = data
	}
	
	get from() {
		return new Station(this.data.from.id)
	}
	
	get to() {
		return new Station(this.data.to.id)
	}
	
	get delay() {
		return this.data.delay
	}
	
	get direction() {
		return this.data.direction
	}
	
	get start() {
		return this.data.start
	}
	
	get end() {
		return this.data.end
	}
}

class Station {
	
	constructor(evaId) {
		this.evaId = evaId
		this.promise = loadStationEva(evaId)
	}
	
	get name() {
		return this.promise.then(function(station) { return station.name })
	}
	
	get facilities() {
		return this.bahnhofsnummer.then(function(bahnhofsnummer) { return loadElevatorFor(bahnhofsnummer) })
	}
	
	get bahnhofsnummer() {
		var evaId = this.evaId
		return new Promise(function(resolve) {
			stations()
			.on('data', function(station) {
				if (station.id == evaId) {
					resolve(station.nr)
				}
			})
		})
	}
	
}

var root = { hello: () => 'Hello world!', route: function() {
	return new Route(8006369, 8004094)
} };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

var elevatorCache = {}
function loadElevatorFor(bahnhofsnumer) {
	var cached = elevatorCache[bahnhofsnumer]
	if (cached) {
		return cached
	}
	let url = "https://api.deutschebahn.com/fasta/v1/stations/" + (bahnhofsnumer)
	var myInit = { method: 'GET',
	headers: {"Authorization": "Bearer 8462e8ba208e92a1c88477b81dad227a"}};
	return fetch(url, myInit)
	.then(function(res) {
		return res.json()
	})
	.then(function(result) {
		elevatorCache[bahnhofsnumer] = result.facilities
		return result.facilities
	})
}

function loadStationEva(evaID) {
	let fetch = new Promise(function(resolve) {
		stations()
		.on('data', function(station) {
			if (station.id == evaID) {
				resolve(station)
			}
		})
	}).then(function(station) {
		return loadStation(station.nr)
	}) 
	
	return fetch
}
var stationCache = {}
function loadStation(bahnhofsnumer) {
	let cache = stationCache[bahnhofsnumer]
	
	if (cache) {
		return cache
	}
	let url = "https://api.deutschebahn.com/stada/v2/stations/" + bahnhofsnumer
	var myInit = { method: 'GET',
	               headers: {"Authorization": "Bearer 8462e8ba208e92a1c88477b81dad227a"},
	               cache: 'force-cache',
	 				"cache-control": 'force-cache' };
	let promies = fetch(url, myInit)
	.then(function(res) {
		return res.json()
	})
	.then(function(result) {
		let station = result.result[0]
		stationCache[bahnhofsnumer] = station
		return station
	})
	
	return promies
}


