const parse = require('csv-parse');
const fs = require('fs');
const StationIdMappingService = require('./StationIdMappingService.js');

require.extensions['.csv'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};
const trainStations = require('./trainstations.csv');

// http://stackoverflow.com/questions/26836146/how-to-sort-array-items-by-longitude-latitude-distance-in-javascripts
function calculateDistance(lat1, lon1, lat2, lon2) {
  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const radlon1 = Math.PI * lon1 / 180;
  const radlon2 = Math.PI * lon2 / 180;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;

  // Miles to Kilometers
  dist *= 1.609344;

  return dist;
}

class NearbyStationService {
  constructor(stationService) {
    this.stationService = stationService;
    this.stationIdMappingService = new StationIdMappingService()
  }

  allStationsSortedByDistance(latitude, longitude, radius, count, offset) {
    const promise = new Promise(((resolve) => {
      parse(trainStations, { comment: '#', delimiter: ';', columns: true }, (err, stations) => {
        const result = stations.filter((station) => {
          return calculateDistance(latitude * 1, longitude * 1, station.latitude * 1, station.longitude * 1) <= radius / 1000;
        }).sort((a, b) => {
          const distanceToA = calculateDistance(latitude * 1, longitude * 1, a.latitude * 1, a.longitude * 1);
          const distanceToB = calculateDistance(latitude * 1, longitude * 1, b.latitude * 1, b.longitude * 1);
          return distanceToA - distanceToB;
        }).slice(offset, count);

        resolve(result);
      });
    }));

    return promise;
  }

  /**
	 * Return a promise which resolves to a list of stations nearby a given location.
	 * @param {double} latitude
	 * @param {double} lonitude
   * @param {integer} radius - radius within stations to return
   * @param {integer} count - count of the returned stations 
	 * @param {integer} offset - offset of the returned stations
	 * @return {Promise<Array<Station>S} promise of a list of stations - A promise which resolves to a list of stations.
	 */
  stationNearby(latitude, longitude, radius, count, offset) {
    const self = this;
    const promise = this.allStationsSortedByDistance(latitude, longitude, radius, count, offset)
      .then((stations) => {
        const evaIDs = stations.map(station => station.id);
        return self.stationIdMappingService.stationNumbersByEvaIds(evaIDs);
      }).then(stationNrs => stationNrs.map(nr => self.stationService.stationByBahnhofsnummer(nr)));

    return promise;
  }
}

module.exports = NearbyStationService;
