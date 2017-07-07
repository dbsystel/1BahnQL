const fetch = require("node-fetch")
const hafas = require('db-hafas')
const { stationNumberByEvaId } = require('./StationIdMappingService.js')

const APIToken = process.env.DBDeveloperAuthorization

//Models
const Station = require('./station.js')

function loadStationEvaPromise(evaID) {
  return stationNumberByEvaId(evaID).then(stationNumber => loadStationPromise(stationNumber));
}

function stationByEvaId(evaID) {
  const promise = loadStationEvaPromise(evaID);
  return new Station(promise);
}

function stationByBahnhofsnummerPromise(bahnhofsnummer) {
  const url = `https://api.deutschebahn.com/stada/v2/stations/${bahnhofsnummer}`;
  const myInit = { method: 'GET',
	               headers: { Authorization: 'Bearer ' + APIToken },
			   };
  const promise = fetch(url, myInit)
	.then(res => res.json())
	.then((result) => result.result[0]);

  return promise;
}

function stationByBahnhofsnummer(bahnhofsnummer) {
  const promise = stationByBahnhofsnummerPromise(bahnhofsnummer);
  return new Station(promise);
}

function searchStations(searchTerm) {
  const url = `https://api.deutschebahn.com/stada/v2/stations?searchstring=*${searchTerm}*`;
  const myInit = { method: 'GET',
    headers: { Authorization: 'Bearer ' + APIToken } };
  const promies = fetch(url, myInit)
	.then(res => res.json())
	.then(result => (result.result || []).map(station => new Station(new Promise((resolve) => {
  resolve(station);
}))));

  return promies;
}

module.exports = { searchStations, stationByEvaId, stationByBahnhofsnummer }