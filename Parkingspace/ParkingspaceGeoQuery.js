const Parkingspace = require('./Parkingspace.js');
const fetch = require('node-fetch');

function loadParkingSpaceByGeo(lat, lon) {
  // const cache = parkingSpaceCache[spaceId];
  // if (cache) {
  //   return cache;
  // }
  const url = 'http://opendata.dbbahnpark.info/api/beta/sites';
  const myInit = {
    method: 'GET',
    cache: 'force-cache',
    'cache-control': 'force-cache',
  };

  const promise = fetch(url, myInit)
    .then(res => res.json())
    .then((result) => {
      if (result.count > 0) {
      // Sort by distance
      // geolib.orderByDistance(object latlng, mixed coords)
      // 
        console.log(`did load ${result.count} items`);
        const mapped = result.results.map((elem) => {
          elem.distance = calculateDistance(lat, lon, parseFloat(elem.parkraumGeoLatitude), parseFloat(elem.parkraumGeoLongitude));
          return elem;
        });

        // sort by distance
        const sorted = mapped.sort((elem1, elem2) => elem1.distance - elem2.distance);
        return sorted.slice(0, 5).map(elem => new Parkingspace(elem));
      }
    });

  return promise;
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

module.exports = loadParkingSpaceByGeo;
