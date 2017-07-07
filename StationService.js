const stations = require('db-stations');
const fetch = require("node-fetch")
const hafas = require('db-hafas')

const APIToken = process.env.DBDeveloperAuthorization

//Models
const Station = require('./station.js')

function stationNumberByAttribute(attibute, matchingAttribute) {
    return new Promise((resolve) => {
		stations().on('data', (station) => {
	        if (station[attibute] == matchingAttribute) {
	          resolve(station.nr);
	        }
      	});
    });
}

function stationNumberByEvaId(evaID) {
	return stationNumberByAttribute("id", evaID)
}

function stationNumberFromDS100(ds100) {
	return stationNumberByAttribute("ds100", ds100)
}

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

function stationNumbersByEvaIds(evaIDs) {
  return new Promise((resolve) => {
	var result = []
	  stations().on('data', (station) => {
	      if(evaIDs.find((id) => id == station.id)) {
	        result.push({nr: station.nr, id: station.id});
	      }
    }).on("end", function() {
    	resolve(result.sort((ids1, ids2) => evaIDs.indexOf(ids1.id) > evaIDs.indexOf(ids2.id)).map(ids => ids.nr))
    });
  });
}

module.exports = { searchStations, stationByEvaId, stationByBahnhofsnummer, stationNumberByEvaId, stationNumbersByEvaIds }