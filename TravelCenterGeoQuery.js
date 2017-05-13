const TravelCenter = require('./TravelCenter');
const fetch = require('node-fetch');
const APIToken = process.env.DBDeveloperAuthorization

function loadNearbyTravelCenter(lat, lon) {
  // const cache = parkingSpaceCache[spaceId];
  // if (cache) {
  //   return cache;
  // }
  const url = `https://api.deutschebahn.com/reisezentren/v1/reisezentren/loc/${lat}/${lon}`;
  const myInit = {
    method: 'GET',
    cache: 'force-cache',
    'cache-control': 'force-cache',
    headers: { Authorization: 'Bearer ' + APIToken },
  };

  const promise = fetch(url, myInit)
  .then(res => res.json())
  .then((result) => {
      return new TravelCenter(result);
  });

  return promise;
}

module.exports = loadNearbyTravelCenter;

/*

{
  "dist": 1.003260392769918,
  "id": 501072,
  "name": "Reisezentrum Berlin Alexanderplatz",
  "address": "Dircksenstraße 7",
  "postCode": "10178",
  "city": "Berlin",
  "type": "Reisezentrum",
  "openingTimes": {
    "mon": [
      "08:00-20:00"
    ],
    "tue": [
      "08:00-20:00"
    ],
    "wed": [
      "08:00-20:00"
    ],
    "thu": [
      "08:00-20:00"
    ],
    "fri": [
      "08:00-20:00"
    ],
    "sat": [
      "09:00-18:30"
    ],
    "sun": [
      "09:00-18:30"
    ]
  },
  "lat": 52.521853,
  "lon": 13.41124
}

 */