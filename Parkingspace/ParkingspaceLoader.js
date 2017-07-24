const fetch = require('node-fetch');
const Parkingspace = require('./Parkingspace.js');

const serviceURL = '/bahnpark/v1';

class ParkingspaceLoader {
  constructor(APIToken, baseURL) {
    this.APIToken = APIToken;
    this.baseURL = baseURL;
  }

  get fetchConfiguration() {
    const headers = {};
    const configuration = {
      method: 'GET',
      headers,
    };

    return configuration;
  }

  spaceById(spaceId) {
    const url = `${this.baseURL}${serviceURL}/sites`;
    const configuration = this.fetchConfiguration;

    const promise = fetch(url, configuration)
      .then(res => res.json())
      .then((result) => {
        if (result.count > 0) {
          const filteredResult = result.results.filter(elem => elem.parkraumId == spaceId);

          if (filteredResult.length > 0) {
            return filteredResult[0];
          }
          return null;
        }
      }, (error) => {
        console.error(error);
      });

    return promise;
  }

  occupancyForId(spaceId) {
    const url = `${this.baseURL}${serviceURL}/occupancy/${spaceId}`;
    const configuration = this.fetchConfiguration;

    const promise = fetch(url, configuration)
      .then(res => res.json())
      .then((result) => {
        const occupancyData = result;

        if (occupancyData.code == 5101) {
          return null;
        }

        return occupancyData.allocation;
      }, (error) => {
        console.error(error);
      });

    return promise;
  }

  spacesForStationNumber(stationNumber) {
    const url = `${this.baseURL}${serviceURL}/sites`;
    const configuration = this.fetchConfiguration;

    const promise = fetch(url, configuration)
      .then(res => res.json())
      .then((result) => {
        if (result.count > 0) {
          return result.results.filter(elem => elem.parkraumBahnhofNummer == stationNumber);
        }
        return [];
      }, (error) => {
        console.error(error);
      });

    return promise;
  }

  nearbyParkingspaces(latitude, longitude, radius) {
    const url = `${this.baseURL}${serviceURL}/sites`;
    const configuration = this.fetchConfiguration;

    const promise = fetch(url, configuration)
      .then(res => res.json())
      .then((result) => {
        if (result.count > 0) {
          // Sort by distance
          // geolib.orderByDistance(object latlng, mixed coords)
          const mapped = result.results.map((elem) => {
            elem.distance = calculateDistance(latitude, longitude, parseFloat(elem.parkraumGeoLatitude), parseFloat(elem.parkraumGeoLongitude));
            return elem;
          });

          // sort by distance
          mapped.sort((elem1, elem2) => elem1.distance - elem2.distance);
          return mapped.filter(elem => elem.distance <= radius/1000);
        }
        return [];
      }, (error) => {
        console.error(error);
      });

    return promise;
  }
}

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

module.exports = ParkingspaceLoader;
