/* jslint node: true */
/* eslint-env mocha */

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const RouteRelationships = require('./../../Routing/RouteRelationships');

describe('RouteRelationships', () => {

  it('resolve should connect stationService & from', () => {
    //Given
    var capturedEvaId;
    let relationships = new RouteRelationships();
    relationships.stationService = { stationByEvaId: (evaId) => { capturedEvaId = evaId; return "Sucess" } }
    let firstRoutePart = { fromEvaId: 1};
    let route = { parts: [firstRoutePart] };

    //When
    relationships.resolve(route);

    //Then
    expect(route.from()).to.be.equal("Sucess");
    expect(capturedEvaId).to.be.equal(1);
  });

  it('resolve should connect stationService & to', () => {
    //Given
    var capturedEvaId;
    let relationships = new RouteRelationships();
    relationships.stationService = { stationByEvaId: (evaId) => { capturedEvaId = evaId; return "Sucess" } }
    let firstRoutePart = { toEvaId: 1 };
    let route = { parts: [firstRoutePart] };

    //When
    relationships.resolve(route);

    //Then
    expect(route.to()).to.be.equal("Sucess");
    expect(capturedEvaId).to.be.equal(1);
  });

  it('resolve should connect stationService & route.parts.from', () => {
    //Given
    var capturedEvaId;
    let relationships = new RouteRelationships();
    relationships.stationService = { stationByEvaId: (evaId) => { capturedEvaId = evaId; return "Sucess" } }
    let firstRoutePart = { toEvaId: 1 };
    let route = { parts: [firstRoutePart] };

    //When
    relationships.resolve(route);

    //Then
    expect(route.parts[0].to()).to.be.equal("Sucess");
    expect(capturedEvaId).to.be.equal(1);
  });

  it('resolve should connect stationService & route.parts.to', () => {
    //Given
    var capturedEvaId;
    let relationships = new RouteRelationships();
    relationships.stationService = { stationByEvaId: (evaId) => { capturedEvaId = evaId; return "Sucess" } }
    let firstRoutePart = { fromEvaId: 1 };
    let route = { parts: [firstRoutePart] };

    //When
    relationships.resolve(route);

    //Then
    expect(route.parts[0].from()).to.be.equal("Sucess");
    expect(capturedEvaId).to.be.equal(1);
  });

  it('resolve should connect trackService & route.parts.departingTrack', () => {
    //Given
    var capturedEvaId;
    var capturedPlatform;
    let relationships = new RouteRelationships();
    relationships.trackService = { trackAtStationEvaIdWithTrackNumberNumber: (evaId, trackNumber) => { capturedEvaId = evaId; capturedPlatform = trackNumber; return "Sucess" } }
    let firstRoutePart = { fromEvaId: 1, platform: "1"  };
    let route = { parts: [firstRoutePart] };

    //When
    relationships.resolve(route);

    //Then
    expect(route.parts[0].departingTrack()).to.be.equal("Sucess");
    expect(capturedEvaId).to.be.equal(1);
    expect(capturedPlatform).to.be.equal("1");
  });

  it('resolve should connect trackService & route.parts.arrivingTrack', () => {
    //Given
    var capturedEvaId;
    var capturedPlatform;
    let relationships = new RouteRelationships();
    relationships.trackService = { trackAtStationEvaIdWithTrackNumberNumber: (evaId, trackNumber) => { capturedEvaId = evaId; capturedPlatform = trackNumber; return "Sucess" } }
    let firstRoutePart = { toEvaId: 1, platform: "1"  };
    let route = { parts: [firstRoutePart] };

    //When
    relationships.resolve(route);

    //Then
    expect(route.parts[0].arrivingTrack()).to.be.equal("Sucess");
    expect(capturedEvaId).to.be.equal(1);
    expect(capturedPlatform).to.be.equal("1");
  });


});
