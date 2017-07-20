/* jslint node: true */
/* eslint-env mocha */

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const FacilityLoaderMock = require('./FacilityLoaderMock.js');
const FacilityService = require('./../../Facility/FacilityService.js');


describe('FacilityService', () => {
  var facilityLoaderMock = new FacilityLoaderMock();
  let facilityServcie = new FacilityService(facilityLoaderMock)

  beforeEach(function() {
    facilityLoaderMock = new FacilityLoaderMock();
    facilityServcie = new FacilityService(facilityLoaderMock);
  });

  it('stationByEvaId should return valid station', () => {
    facilityLoaderMock.result = require('./FacilitiesMockResults');
    let promise = facilityServcie.facilitiesForStationNumber(1).then(facilities => facilities[0]);

    return Promise.all([
        expect(promise).to.eventually.have.property("equipmentNumber", 10355942),
        expect(promise).to.eventually.have.property("type", "ELEVATOR"),
        expect(promise).to.eventually.have.property("description", "zu Gleis 6/7"),
        expect(promise).to.eventually.have.property("state", "ACTIVE"),
        expect(promise).to.eventually.have.deep.property("location", {latitude: 6.09134, longitude: 50.767629})

    ]);
  });


});
