const TravelCenter = require('./TravelCenter');
const fetch = require('node-fetch');

const APIToken = process.env.DBDeveloperAuthorization;

function loadNearbyTravelCenter(lat, lon) {
  const url = `https://api.deutschebahn.com/reisezentren/v1/reisezentren/loc/${lat}/${lon}`;
  const myInit = {
    method: 'GET',
    cache: 'force-cache',
    'cache-control': 'force-cache',
    headers: { Authorization: `Bearer ${APIToken}` },
  };

  const promise = fetch(url, myInit)
    .then(res => res.json())
    .then(result => new TravelCenter(result));

  return promise;
}

module.exports = loadNearbyTravelCenter;
