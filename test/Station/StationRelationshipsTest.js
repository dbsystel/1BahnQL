/* jslint node: true */
/* eslint-env mocha */

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const StationRelationships = require('./../../Station/StationRelationships');

describe('StationRelationships', () => {

  it('resolve should connect parkingSpaceService & parkingSpaces', () => {
    //Given
    var capturedStationNumber;
    let relationships = new StationRelationships();
    relationships.parkingSpaceService = { parkingspacesForStationNumber: (stationNumber) => { capturedStationNumber = stationNumber; return "Sucess" } }
    let station = { stationNumber: 1 };

    //When
    relationships.resolve(station);

    //Then
    expect(station.parkingSpaces()).to.be.equal("Sucess");
    expect(capturedStationNumber).to.be.equal(1);
  });

  it('resolve should connect facilityService & facilities', () => {
    //Given
    var capturedStationNumber;
    let relationships = new StationRelationships();
    relationships.facilityService = { facilitiesForStationNumber: (stationNumber) => { capturedStationNumber = stationNumber; return "Sucess" } }
    let station = { stationNumber: 1 };

    //When
    relationships.resolve(station);

    //Then
    expect(station.facilities()).to.be.equal("Sucess");
    expect(capturedStationNumber).to.be.equal(1);
  });

  it('resolve should connect timetableService & timetable', () => {
    //Given
    var capturedPrimaryEvaId;
    let relationships = new StationRelationships();
    relationships.timetableService = { timetableForEvaId: (primaryEvaId) => { capturedPrimaryEvaId = primaryEvaId; return "Sucess" } }
    let station = { primaryEvaId: 1 };

    //When
    relationships.resolve(station);

    //Then
    expect(station.timetable()).to.be.equal("Sucess");
    expect(capturedPrimaryEvaId).to.be.equal(1);
  });

  it('resolve should connect trackService & tracks', () => {
    //Given
    var capturedStationNumber;
    let relationships = new StationRelationships();
    relationships.trackService = { tracksForStationNumber: (stationNumber) => { capturedStationNumber = stationNumber; return "Sucess" } }
    let station = { stationNumber: 1 };

    //When
    relationships.resolve(station);

    //Then
    expect(station.tracks()).to.be.equal("Sucess");
    expect(capturedStationNumber).to.be.equal(1);
  });


});
