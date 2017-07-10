"use strict"
const fetch = require("node-fetch")
const baseURL = "https://api.deutschebahn.com"

function StationLoader(APIToken) {

	function fetchConfiguration() {
		let headers = {
			Authorization: 'Bearer ' + APIToken
		} 
		let configuration = {
			method: 'GET',
			headers: headers
		}
		
		return configuration
	}

	function stationByBahnhofsnummer(bahnhofsnummer) {
		const url = `${baseURL}/stada/v2/stations/${bahnhofsnummer}`;
		const configuration = fetchConfiguration()
		const promise = fetch(url, configuration)
			.then(res => res.json())
			.then((result) => result.result[0]);

		return promise;
	}

	function searchStations(searchTerm) {
		const url = `${baseURL}/stada/v2/stations?searchstring=*${searchTerm}*`;
		const configuration = fetchConfiguration()
		const promies = fetch(url, configuration)
			.then(res => res.json())
			.then(result => (result.result || []))
			.then(stationsData => stationsData.map(station => new Promise((resolve) => resolve(station))))

		return promies;
	}
	
	return { searchStations,  stationByBahnhofsnummer }
}

module.exports = StationLoader
