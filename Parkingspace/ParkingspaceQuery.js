const fetch = require('node-fetch');

class ParkingSpaceQuery {
  constructor(id) {
    this.id = id;
    this.promise = loadParkingSpaceById(id);
  }

  get options() {
    return this.promise.then((result) => { if (result) { return new ParkingSpace(result); } });
  }
}

const parkingSpaceCache = {};

function loadParkingSpaceById(spaceId) {
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
        const filteredResult = result.results.filter(elem => elem.parkraumId == spaceId);

        if (filteredResult.length > 0) {
          const parkingSpace = filteredResult[0];

          return parkingSpace;
        }
      }
    });

  return promise;
}

const stationParkingSpacesCache = {};

function getParkingSpacesByBhfNr(bhfNr) {
  // const cache = parkingSpaceCache[bhfNr];
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
        const filteredResult = result.results.filter(elem => elem.parkraumBahnhofNummer == bhfNr);

        if (filteredResult.length > 0) {
          stationParkingSpacesCache[bhfNr] = filteredResult;
          console.log(`found ${filteredResult.length} parking spaces for bhf nr ${bhfNr}`);

          const parkingSpaces = filteredResult.map(space => new ParkingSpace(space));

          return parkingSpaces;
        }
      }
    });

  return promise;
}


module.exports = { ParkingSpaceQuery, getParkingSpacesByBhfNr };

/*
{
  "type": "results",
  "version": 1,
  "offset": 0,
  "limit": 0,
  "count": 293,
  "totalCount": 293,
  "results": [
    {
      "type": "siteCms",
      "bundesland": "Baden-Württemberg",
      "isPublished": true,
      "parkraumAusserBetriebText": "",
      "parkraumAusserBetrieb_en": "",
      "parkraumBahnhofName": "Aalen",
      "parkraumBahnhofNummer": "4",
      "parkraumBemerkung": "",
      "parkraumBemerkung_en": "",
      "parkraumBetreiber": "Contipark Parkgaragen GmbH",
      "parkraumDisplayName": "Parkplatz Bahnhof Aalen Rückseite",
      "parkraumEntfernung": "50-99",
      "parkraumGeoLatitude": "48.839307",
      "parkraumGeoLongitude": "10.097189",
      "parkraumId": "100001",
      "parkraumIsAusserBetrieb": false,
      "parkraumIsDbBahnPark": true,
      "parkraumIsOpenData": true,
      "parkraumIsParktagesproduktDbFern": false,
      "parkraumKennung": "P2",
      "parkraumName": "",
      "parkraumOeffnungszeiten": "24 Stunden, 7 Tage",
      "parkraumOeffnungszeiten_en": "24 hours a day, 7 days a week",
      "parkraumParkTypName": "Parkplatz",
      "parkraumParkart": "Parkplatz",
      "parkraumParkart_en": "Parking ticket machine",
      "parkraumReservierung": "",
      "parkraumStellplaetze": "55",
      "parkraumTechnik": "Parkscheinautomat",
      "parkraumTechnik_en": "Parking ticket machine",
      "parkraumZufahrt": "Hirschbachstraße null",
      "parkraumZufahrt_en": "Hirschbachstraße null",
      "tarif1MonatAutomat": "28,00",
      "tarif1MonatDauerparken": "28,00",
      "tarif1MonatDauerparkenFesterStellplatz": "50,00",
      "tarif1Std": "1,20",
      "tarif1Tag": "3,50",
      "tarif1Woche": "14,00",
      "tarif30Min": "0,60",
      "tarifFreiparkzeit": "N",
      "tarifFreiparkzeit_en": "N",
      "tarifMonatIsDauerparken": true,
      "tarifMonatIsParkAndRide": false,
      "tarifMonatIsParkscheinautomat": true,
      "tarifParkdauer": "Max. 10 Tage oder Monatsparkschein",
      "tarifParkdauer_en": "Max. 10 days or monthly ticket from the ticket machine",
      "tarifRabattDBIsBahnCard": false,
      "tarifRabattDBIsParkAndRail": false,
      "tarifRabattDBIsbahncomfort": false,
      "tarifSondertarif": "",
      "tarifSondertarif_en": "",
      "tarifWieRabattDB": "",
      "tarifWieRabattDB_en": "",
      "tarifWoVorverkaufDB": "",
      "tarifWoVorverkaufDB_en": "",
      "zahlungMedien": "Zahlung am Automaten in Münzen, mit Kreditkarte (AMEX, VISA, MasterCard) oder EC-Karte.",
      "zahlungMedien_en": "Payment at ticket machine: coins, credit card (AMEX VISA, MasterCard), or MaestroCard."
    },
    ...
  ]
}
 */
