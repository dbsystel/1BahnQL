"use strict"
const fetch = require("node-fetch")
const baseURL = "https://api.deutschebahn.com"

class StationLoader {	
	constructor(APIToken) {
		this.APIToken = APIToken
	}

	get fetchConfiguration() {
		let headers = {
			Authorization: 'Bearer ' + this.APIToken
		} 
		let configuration = {
			method: 'GET',
			headers: headers
		}
		
		return configuration
	}

	stationByBahnhofsnummer(bahnhofsnummer) {
		const url = `${baseURL}/stada/v2/stations/${bahnhofsnummer}`;
		const configuration = this.fetchConfiguration
		const promise = fetch(url, configuration)
			.then(res => res.json())
			.then(function(result) {
				if (result && result.result && result.result.count > 0) {
					return result.result[0]
				}
				return null
			});

		return promise;
	}

	searchStations(searchTerm) {
		const url = `${baseURL}/stada/v2/stations?searchstring=*${searchTerm}*`;
		const configuration = this.fetchConfiguration
		const promies = fetch(url, configuration)
			.then(res => res.json())
			.then(result => (result.result || []))
			.then(stationsData => stationsData.map(station => new Promise((resolve) => resolve(station))))

		return promies;
	}
	
}

module.exports = StationLoader
