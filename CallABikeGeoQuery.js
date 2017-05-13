'use strict';

const CallABikeBike = require('./CallABikeBike');
const fetch = require('node-fetch');

function loadNearbyBikes(lat, lon) {
  const url = `https://api.deutschebahn.com/flinkster-api-ng/v1/bookingproposals?lat=${lat}&lon=${lon}&radius=10000&offset=0&limit=5&providernetwork=2&expand=area%2Crentalobject%2Cprice`;
  const myInit = {
    method: 'GET',
    cache: 'force-cache',
    'cache-control': 'force-cache',
    headers: { Authorization: 'Bearer a26069a09ba49f28c6748e54f1011ebd' },
  };

  const promise = fetch(url, myInit)
  .then(res => res.json())
  .then((result) => {
    if (result.items.length > 0) {

        const allBikes = result.items.map((bike) => {
          return new CallABikeBike(bike);
        });

        return allBikes;
    }
  });

  return promise;
}

module.exports = loadNearbyBikes;
