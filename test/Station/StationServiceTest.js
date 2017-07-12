/* jslint node: true */
/* eslint-env mocha */

const chai = require('chai');
const StationService = require('.../Station/StationService.js')

const expect = chai.expect;

class StationLoaderMock {
  constructor() { }

  stationByEvaId() {
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

let stationService = StationService(StationLoaderMock())

describe('StationService', () => {
  it('stationByEvaId should return valid station', () => {
    let promise = stationService.stationByEvaId("1")
    promise.then(function(station) {
      expect(station).to.equal(true);
    })
  });
});
