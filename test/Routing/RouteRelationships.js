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


});
