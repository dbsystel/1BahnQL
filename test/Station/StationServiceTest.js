/* jslint node: true */
/* eslint-env mocha */

const chai = require('chai');
const StationService = require('../../Station/StationService.js')
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

class StationLoaderMock {
  constructor() { }

  stationByBahnhofsnummer() {
    return Promise.resolve({
      "number": 1,
      "name": "Aachen Hbf",
      "mailingAddress": {
        "city": "Aachen",
        "zipcode": "52064",
        "street": "Bahnhofplatz 2a"
      },
      "category": 2,
      "hasParking": true,
      "hasBicycleParking": true,
      "hasLocalPublicTransport": true,
      "hasPublicFacilities": true,
      "hasLockerSystem": true,
      "hasTaxiRank": true,
      "hasTravelNecessities": true,
      "hasSteplessAccess": "yes",
      "hasMobilityService": "Ja, um Voranmeldung unter 01806 512 512 wird gebeten",
      "federalState": "Nordrhein-Westfalen",
      "regionalbereich": {
        "number": 4,
        "name": "RB West",
        "shortName": "RB W"
      },
      "aufgabentraeger": {
        "shortName": "Zweckverband Nahverkehr Rheinland GmbH",
        "name": "NVR"
      },
      "localServiceStaff": {
        "availability": {
          "monday": {
            "fromTime": "06:00",
            "toTime": "22:30"
          },
          "tuesday": {
            "fromTime": "06:00",
            "toTime": "22:30"
          },
          "wednesday": {
            "fromTime": "06:00",
            "toTime": "22:30"
          },
          "thursday": {
            "fromTime": "06:00",
            "toTime": "22:30"
          },
          "friday": {
            "fromTime": "06:00",
            "toTime": "22:30"
          },
          "saturday": {
            "fromTime": "06:00",
            "toTime": "22:30"
          },
          "sunday": {
            "fromTime": "06:00",
            "toTime": "22:30"
          },
          "holiday": {
            "fromTime": "06:00",
            "toTime": "22:30"
          }
        }
      },
      "timeTableOffice": {
        "email": "DBS.Fahrplan.NordrheinWestfalen@deutschebahn.com",
        "name": "Bahnhofsmanagement Köln"
      },
      "szentrale": {
        "number": 15,
        "publicPhoneNumber": "0203/30171055",
        "name": "Duisburg Hbf"
      },
      "stationManagement": {
        "number": 45,
        "name": "Düsseldorf"
      },
      "evaNumbers": [
        {
          "number": 8000001,
          "geographicCoordinates": {
            "type": "Point",
            "coordinates": [
              6.091499,
              50.7678
            ]
          },
          "isMain": true
        }
      ],
      "ril100Identifiers": [
        {
          "rilIdentifier": "KA",
          "isMain": true,
          "hasSteamPermission": true,
          "geographicCoordinates": {
            "type": "Point",
            "coordinates": [
              6.091201396,
              50.767558188
            ]
          }
        }
      ]
    })
  }
}

let stationService = new StationService(new StationLoaderMock())

describe('StationService', () => {
  it('stationByEvaId should return valid station', () => {
    let promise = stationService.stationByEvaId(1)
    return Promise.all([
        expect(promise).to.eventually.have.property("primaryEvaId", 8000001),
        expect(promise).to.eventually.have.property("stationNumber", 1),
        expect(promise).to.eventually.have.property("primaryRil100", "KA"),
        expect(promise).to.eventually.have.property("name", "Aachen Hbf"),
        expect(promise).to.eventually.have.property("category", 2),
        expect(promise).to.eventually.have.property("hasParking", true),
        expect(promise).to.eventually.have.property("hasBicycleParking", true),
        expect(promise).to.eventually.have.property("hasLocalPublicTransport", true),
        expect(promise).to.eventually.have.property("hasPublicFacilities", true),
        expect(promise).to.eventually.have.property("hasLockerSystem", true),
        expect(promise).to.eventually.have.property("hasTaxiRank", true),
        expect(promise).to.eventually.have.property("hasTravelNecessities", true),
        expect(promise).to.eventually.have.property("hasSteplessAccess", "yes"),
        expect(promise).to.eventually.have.property("hasMobilityService", "Ja, um Voranmeldung unter 01806 512 512 wird gebeten"),
        expect(promise).to.eventually.have.property("hasSteamPermission", true),
        expect(promise).to.eventually.have.deep.property("location", {latitude: 6.091499, longitude: 50.7678}),
        expect(promise).to.eventually.have.deep.property("regionalArea", {name: "RB West", number: 4, shortName: "RB W" }),
        expect(promise).to.eventually.have.deep.property("mailingAddress", { city: "Aachen", zipcode: "52064", street: "Bahnhofplatz 2a" }),
        expect(promise).to.eventually.have.deep.property("regionalArea", { number: 4, name: "RB West", shortName: "RB W" }),
        // expect(promise).to.eventually.deep.include("DBInformationOpeningTimes", {}),
        // expect(promise).to.eventually.deep.include("localServiceStaffAvailability", {}),
         //expect(promise).to.eventually.have.deep.property("aufgabentraeger", {shortName: "Zweckverband Nahverkehr Rheinland GmbH", name: "NVR"}),
        // expect(promise).to.eventually.deep.include("timeTableOffice", {}),
        // expect(promise).to.eventually.deep.include("szentrale", {}),
        // expect(promise).to.eventually.deep.include("stationManagement", {})

    ]);
  });
});
