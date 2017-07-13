const stations = require('db-stations');
const fetch = require("node-fetch")
const hafas = require('db-hafas')

const Location = require('./location.js');
const MailAddress = require('./mailAddress');
const OpeningTimes = require('./openingTimes.js');
const loadElevatorFor = require('./facilities.js');
const { getParkingSpacesByBhfNr } = require('./Parkingspace/ParkingSpaceQuery');
const { loadTimeTableFor } = require('./timetables.js');
const APIToken = process.env.DBDeveloperAuthorization

class RegionalArea {
  constructor(number, name, shortName) {
    this.number = number;
    this.name = name;
    this.shortName = shortName;
  }
}

class StationContact {
  constructor(name, shortName, email, number, phoneNumber) {
    this.name = name;
    this.shortName = shortName;
    this.email = email;
    this.number = number;
    this.phoneNumber = phoneNumber;
  }
}

class Station {

  constructor(promise) {
    this.loadStation = promise;
  }

  get name() {
    return this.loadStation.then(station => station.name);
  }

  get location() {
    return this.loadStation.then((station) => {
      const coordinates = station.evaNumbers[0].geographicCoordinates.coordinates;
      return new Location(coordinates[1], coordinates[0]);
    });
  }

  get facilities() {
    return this.bahnhofsNummer.then(bahnhofsnummer => loadElevatorFor(bahnhofsnummer));
  }

  get category() {
    return this.loadStation.then(station => station.category);
  }

  get hasParking() {
    return this.loadStation.then(station => station.hasParking);
  }

  get hasBicycleParking() {
    return this.loadStation.then(station => station.hasBicycleParking);
  }

  get hasLocalPublicTransport() {
    return this.loadStation.then(station => station.hasLocalPublicTransport);
  }

  get hasPublicFacilities() {
    return this.loadStation.then(station => station.hasPublicFacilities);
  }

  get hasLockerSystem() {
    return this.loadStation.then(station => station.hasLockerSystem);
  }

  get hasTaxiRank() {
    return this.loadStation.then(station => station.hasTaxiRank);
  }

  get hasTravelNecessities() {
    return this.loadStation.then(station => station.hasTravelNecessities);
  }

  get hasSteplessAccess() {
    return this.loadStation.then(station => station.hasSteplessAccess);
  }

  get hasMobilityService() {
    return this.loadStation.then(station => station.hasMobilityService);
  }

  get federalState() {
    return this.loadStation.then(station => station.federalState);
  }

  get regionalArea() {
    return this.loadStation.then((station) => {
      const area = station.regionalbereich;
      return new RegionalArea(area.number, area.name, area.shortName);
    });
  }

  get mailingAddress() {
    return this.loadStation.then((station) => {
      const adress = station.mailingAddress;
      return new MailAddress(adress.city, adress.zipcode, adress.street);
    });
  }

  get aufgabentraeger() {
    return this.loadStation.then((station) => {
      const contact = station.aufgabentraeger;
			// ShortName & name switched -- see https://github.com/lightsprint09/DBOpenDataAPIBugs/issues/1
      return new StationContact(contact.shortName, contact.name,
				 contact.email, contact.number, contact.phoneNumber);
    });
  }

  get timeTableOffice() {
    return this.loadStation.then((station) => {
      const contact = station.timeTableOffice;
      return new StationContact(contact.name, contact.shortName,
				 contact.email, contact.number, contact.phoneNumber);
    });
  }

  get szentrale() {
    return this.loadStation.then((station) => {
      const contact = station.szentrale;
      return new StationContact(contact.name, contact.shortName,
				 contact.email, contact.number, contact.publicPhoneNumber);
    });
  }

  get stationManagement() {
    return this.loadStation.then((station) => {
      const contact = station.stationManagement;
      return new StationContact(contact.name, contact.shortName,
				 contact.email, contact.number, contact.phoneNumber);
    });
  }

  get DBInformationOpeningTimes() {
    return this.loadStation.then((station) => {
      if (!station.DBinformation) {
        return null;
      }
      return new OpeningTimes(station.DBinformation.availability);
    });
  }

  get localServiceStaffAvailability() {
    return this.loadStation.then((station) => {
      if (!station.localServiceStaff) {
        return null;
      }
      return new OpeningTimes(station.localServiceStaff.availability);
    });
  }

  get bahnhofsNummer() {
    return this.primaryEvaId.then(evaId => getStationNumberFrom(evaId));
  }

  get primaryEvaId() {
    return this.loadStation.then(station => station.evaNumbers.filter(eva => eva.isMain)[0].number);
  }

  get primaryRil100() {
    return this.loadStation.then(station => station.ril100Identifiers.filter(ril => ril.isMain)[0].rilIdentifier);
  }

  get arrivalDepatureBoard() {
    return this.primaryEvaId.then(evaId => loadTimeTableFor(evaId));
  }

  get parkingSpaces() {
    return this.bahnhofsNummer.then(bhfNr => getParkingSpacesByBhfNr(bhfNr));
  }
}

function getStationNumberFrom(evaID) {
  return new Promise((resolve) => {
    stations()
		.on('data', (station) => {
      if (station.id == evaID) {
        console.log(`resolve bhfNr: ${evaID}`);
        resolve(station.nr);
      }
    });
  });
}
function getStationNumberFromDS100(ds100) {
  console.log(`request ds100: ${ds100}`);
  return new Promise((resolve) => {
    stations()
		.on('data', (station) => {
      if (station.ds100 == ds100) {
        console.log(`resolve bhfNr: ${station.nr}`);
        resolve(station.nr);
      }
    });
  });
}

function loadStationEvaPromise(evaID) {
  return getStationNumberFrom(evaID).then(stationNumber => loadStationPromise(stationNumber));
}

function loadStationEva(evaID) {
  const promise = loadStationEvaPromise(evaID);
  return new Station(promise);
}

function loadStationPromise(bahnhofsnummer) {
  const url = `https://api.deutschebahn.com/stada/v2/stations/${bahnhofsnummer}`;
  const myInit = { method: 'GET',
	               headers: { Authorization: 'Bearer ' + APIToken },
			   };
  const promise = fetch(url, myInit)
	.then(res => res.json())
	.then((result) => {
    const station = result.result[0];
    return station;
  });

  return promise;
}

function loadStation(bahnhofsnummer) {
  const promise = loadStationPromise(bahnhofsnummer);
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

var parse = require('csv-parse');
var fs = require('fs');


require.extensions['.csv'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
var trainStations = require("./trainstations.csv");

function nearbyStations(latitude,longitude,count,callback) {
	allStations(function(err, stations) {
		var result = stations.sort(function(a,b){
			var distanceToA = calculateDistance(latitude * 1,longitude * 1,a.latitude * 1,a.longitude * 1)
			var distanceToB = calculateDistance(latitude * 1,longitude * 1,b.latitude * 1,b.longitude * 1)
			return distanceToA - distanceToB
		}).slice(0, count)

		callback(err, result)
	})
}

function allStations(callback) {
	parse(trainStations, {comment: '#', delimiter: ";", columns: true}, callback);
}

function transformStationObject(station){
	station = transformStationCoordinates(station)
	station = removeUnwantedStationDetails(station)
	station.detailsPath = "stations/" + station.id
	station.displayPath = "stations/" + station.id + "/display"
	return station
}
function transformStationCoordinates(station) {
	var coordinate = {
		latitude: station.latitude * 1,
		longitude: station.longitude * 1
	}
	station.coordinate = coordinate
	delete station.latitude
	delete station.longitude
	return station
}

// http://stackoverflow.com/questions/26836146/how-to-sort-array-items-by-longitude-latitude-distance-in-javascripts
function calculateDistance(lat1, lon1, lat2, lon2) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var radlon1 = Math.PI * lon1/180
        var radlon2 = Math.PI * lon2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515

		// Miles to Kilometers
		dist = dist * 1.609344

        return dist
}

function getStationNumbersFrom(evaIDs) {

  return new Promise((resolve) => {
	  var result = []
    stations()
		.on('data', (station) => {
      if (evaIDs.find((id) => id == station.id)) {
        result.push({nr: station.nr, id: station.id});
      }
    }).on("end", function() {
    	resolve(result.sort((ids1, ids2) => evaIDs.indexOf(ids1.id) > evaIDs.indexOf(ids2.id)).map(ids => ids.nr))
    });
  });
}

function stationNearby(latitude, longitude) {
	var promise = new Promise(function(resolve) {
		nearbyStations(latitude, longitude, 5, function(err, stations) {
			resolve(stations)
		})
	}).then(function(stations) {
		let evaIDs = stations.map(station => station.id) 
		return getStationNumbersFrom(evaIDs).then(function(stationNrs) {
			var loadingStations = stationNrs.map(function(nr) {
				let stationLoad = loadStation(nr)
				return stationLoad
			})
			return loadingStations
		})
	})
	
	return promise
}
module.exports = { Station, loadStationEva, searchStations, stationNearby };
