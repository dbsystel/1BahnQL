'use strict';

const FlinksterCar = require('./FlinksterCar.js');
const fetch = require('node-fetch');

function loadNearbyCars(lat, lon) {
  const url = `https://api.deutschebahn.com/flinkster-api-ng/v1/bookingproposals?lat=${lat}&lon=${lon}&radius=10000&offset=0&limit=5&providernetwork=1&expand=area%2Crentalobject%2Cprice`;
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

        const allCars = result.items.map((car) => {
          return new FlinksterCar(car);
        });

        return allCars;
    }
  });

  return promise;
}

module.exports = loadNearbyCars;

// url https://api.deutschebahn.com/flinkster-api-ng/v1/bookingproposals?lat=52.51427&lon=13.419347&radius=10000&offset=0&limit=5&providernetwork=1&expand=area%2Crentalobject%2Cprice