const fetch = require('node-fetch');

const baseURL = 'https://api.deutschebahn.com/bahnpark/v1';

class ParkingspaceLoader {
  constructor(APIToken) {
    this.APIToken = APIToken;
  }

  get fetchConfiguration() {
    const headers = {
      Authorization: `Bearer ${this.APIToken}`,
    };
    const configuration = {
      method: 'GET',
      headers,
    };

    return configuration;
  }

  spaceById(spaceId) {
    const url = `${baseURL}/spaces/${spaceId}`;
    const configuration = this.fetchConfiguration;

    const promise = fetch(url, configuration)
      .then(res => res.json())
      .then(result => result);

    return promise;
  }

  occupancyForId(spaceId) {
    const url = `${baseURL}/spaces/${spaceId}/occupancies`;
    const configuration = this.fetchConfiguration;

    const promise = fetch(url, configuration)
      .then(res => res.json())
      .then((occupancyData) => {
        if (occupancyData.code === 5101) {
          return null;
        }

        return occupancyData.allocation;
      });

    return promise;
  }

  spacesForStationNumber(stationNumber) {
    const url = `${baseURL}/spaces?limit=1000`;
    const configuration = this.fetchConfiguration;

    const promise = fetch(url, configuration)
      .then(res => res.json())
      .then((result) => {
        if (result.count > 0) {
          return result.items.filter(elem => elem.station.id == stationNumber);
        }
        return [];
      });

    return promise;
  }

  nearbyParkingspaces(latitude, longitude, radius) {
    const url = `${baseURL}/spaces?limit=100`;
    const configuration = this.fetchConfiguration;

    const promise = fetch(url, configuration)
      .then(res => res.json())
      .then((result) => {
        if (result.count > 0) {
          // Sort by distance
          // geolib.orderByDistance(object latlng, mixed coords)
          const mapped = result.items.map((elem) => {
            elem.distance = calculateDistance(latitude, longitude, parseFloat(elem.geoLocation.latitude), parseFloat(elem.geoLocation.longitude));
            return elem;
          });

          // sort by distance
          mapped.sort((elem1, elem2) => elem1.distance - elem2.distance);
          return mapped.filter(elem => elem.distance <= radius / 1000);
        }
        return [];
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
