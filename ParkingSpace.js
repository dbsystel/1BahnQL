

const fetch = require('node-fetch');
const Occupancy = require('./Occupancy');
const Location = require('./Location');

class ParkingSpace {
  constructor(space) {
    this.id = space.parkraumId;
    this.name = space.parkraumDisplayName;
    this.lots = space.parkraumStellplaetze;
    this.location = new Location(space.parkraumGeoLatitude, space.parkraumGeoLongitude);
    this.distance = space.distance;
    this.bundesland = space.bundesland;
    this.isPublished = space.isPublished;
    this.parkraumAusserBetriebText = space.parkraumAusserBetriebText;
    this.parkraumAusserBetrieb_en = space.parkraumAusserBetrieb_en;
    this.parkraumBahnhofName = space.parkraumBahnhofName;
    this.parkraumBahnhofNummer = space.parkraumBahnhofNummer;
    this.parkraumBemerkung = space.parkraumBemerkung;
    this.parkraumBemerkung_en = space.parkraumBemerkung_en;
    this.parkraumBetreiber = space.parkraumBetreiber;
    this.parkraumDisplayName = space.parkraumDisplayName;
    this.parkraumEntfernung = space.parkraumEntfernung;
    this.parkraumIsAusserBetrieb = space.parkraumIsAusserBetrieb;
    this.parkraumIsDbBahnPark = space.parkraumIsDbBahnPark;
    this.parkraumIsOpenData = space.parkraumIsOpenData;
    this.parkraumIsParktagesproduktDbFern = space.parkraumIsParktagesproduktDbFern;
    this.parkraumKennung = space.parkraumKennung;
    this.parkraumName = space.parkraumName;
    this.parkraumOeffnungszeiten = space.parkraumOeffnungszeiten;
    this.parkraumOeffnungszeiten_en = space.parkraumOeffnungszeiten_en;
    this.parkraumParkTypName = space.parkraumParkTypName;
    this.parkraumParkart = space.parkraumParkart;
    this.parkraumParkart_en = space.parkraumParkart_en;
    this.parkraumReservierung = space.parkraumReservierung;
    this.parkraumStellplaetze = space.parkraumStellplaetze;
    this.parkraumTechnik = space.parkraumTechnik;
    this.parkraumTechnik_en = space.parkraumTechnik_en;
    this.parkraumZufahrt = space.parkraumZufahrt;
    this.parkraumZufahrt_en = space.parkraumZufahrt_en;
    this.tarif1MonatAutomat = space.tarif1MonatAutomat;
    this.tarif1MonatDauerparken = space.tarif1MonatDauerparken;
    this.tarif1MonatDauerparkenFesterStellplatz = space.tarif1MonatDauerparkenFesterStellplatz;
    this.tarif1Std = space.tarif1Std;
    this.tarif1Tag = space.tarif1Tag;
    this.tarif1Woche = space.tarif1Woche;
    this.tarif30Min = space.tarif30Min;
    this.tarifFreiparkzeit = space.tarifFreiparkzeit;
    this.tarifFreiparkzeit_en = space.tarifFreiparkzeit_en;
    this.tarifMonatIsDauerparken = space.tarifMonatIsDauerparken;
    this.tarifMonatIsParkAndRide = space.tarifMonatIsParkAndRide;
    this.tarifMonatIsParkscheinautomat = space.tarifMonatIsParkscheinautomat;
    this.tarifParkdauer = space.tarifParkdauer;
    this.tarifParkdauer_en = space.tarifParkdauer_en;
    this.tarifRabattDBIsBahnCard = space.tarifRabattDBIsBahnCard;
    this.tarifRabattDBIsParkAndRail = space.tarifRabattDBIsParkAndRail;
    this.tarifRabattDBIsbahncomfort = space.tarifRabattDBIsbahncomfort;
    this.tarifSondertarif = space.tarifSondertarif;
    this.tarifSondertarif_en = space.tarifSondertarif_en;
    this.tarifWieRabattDB = space.tarifWieRabattDB;
    this.tarifWieRabattDB_en = space.tarifWieRabattDB_en;
    this.tarifWoVorverkaufDB = space.tarifWoVorverkaufDB;
    this.tarifWoVorverkaufDB_en = space.tarifWoVorverkaufDB_en;
    this.zahlungMedien = space.zahlungMedien;
    this.zahlungMedien_en = space.zahlungMedien_en;
  }

  get occupancy() {
    return getOccupancy(this.id);
  }

  get evaId() {
    return getEvaIdForBhfNr(this.parkraumBahnhofNummer);
  }
}

const parkingSpaceOccupancyCache = {};

function getOccupancy(spaceId) {
  // if (cache) {
  //   return new Occupancy(cache.allocation);
  // }

  const url = `http://opendata.dbbahnpark.info/api/beta/occupancy/${spaceId}`;
  const myInit = {
    method: 'GET',
    cache: 'force-cache',
    'cache-control': 'force-cache',
  };

  const promise = fetch(url, myInit)
    .then(res => res.json())
    .then((result) => {
      const occupancyData = result;

      if (occupancyData.code == 5101) {
        return null;
      }

      parkingSpaceOccupancyCache[spaceId] = occupancyData;
      return new Occupancy(occupancyData.allocation);
    });

  return promise;
}

const parkingSpaceStationCache = {};

function getEvaIdForBhfNr(bahnhofNummer) {
  // if (cache) {
  //   return new Occupancy(cache.allocation);
  // }

  const url = 'http://opendata.dbbahnpark.info/api/beta/stations';
  const myInit = {
    method: 'GET',
    cache: 'force-cache',
    'cache-control': 'force-cache',
  };

  const promise = fetch(url, myInit)
    .then(res => res.json())
    .then((result) => {
      console.log(`Try to find ${bahnhofNummer}`);

      if (result.count > 0) {
        const filteredResult = result.results.filter(elem => elem.bahnhofsNummer == bahnhofNummer);

        const parkingStation = filteredResult[0];
        parkingSpaceStationCache[bahnhofNummer] = parkingStation;
        return parkingStation.evaNummer;
      }
    });

  return promise;
}

module.exports = ParkingSpace;
