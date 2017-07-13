const fetch = require('node-fetch');
const Location = require('../location');

class Parkingspace {
  constructor(space, service) {
    this.parkingspaceService = service;

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
    this.parkraumId = space.parkraumId;
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

    console.log(this.parkingspaceService);
  }

  get occupancy() {
    return this.parkingspaceService.occupancyForSpaceId(this.id);
  }

  get evaId() {
    return this.parkingspaceService.evaIdForSpaceId(this.parkraumBahnhofNummer);
  }
}

module.exports = Parkingspace;
