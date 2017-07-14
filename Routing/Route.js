const RoutePart = require("./RoutePart.js");
const { loadStationEva } = require("./../station.js")

class Route {
	constructor(data) {
		this.data = data
	}

	get parts() {
		return this.data.parts.map(element => new RoutePart(element))
	}

	from() {
		console.log("From From")
		let parts = this.data.parts
		return loadStationEva(parts[0].from.id)
	}

	to() {
		let parts = this.data.parts
		return loadStationEva(parts[parts.length - 1].to.id)
	}

}

module.exports = Route
