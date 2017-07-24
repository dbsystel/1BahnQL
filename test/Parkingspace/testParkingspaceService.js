/* jslint node: true */
/* eslint-env mocha */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const ParkingspaceService = require('../../Parkingspace/ParkingspaceService');
const ParkingspaceLoaderMock = require('./ParkingspaceLoaderMock');
const ParkingspaceRelationships = require('../../Parkingspace/ParkingspaceRelationships');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('ParkingspaceService', () => {
  let parkingspaceLoaderMock = new ParkingspaceLoaderMock();
  let parkingspaceService = new ParkingspaceService(parkingspaceLoaderMock);

  beforeEach(() => {
    parkingspaceLoaderMock = new ParkingspaceLoaderMock();
    parkingspaceService = new ParkingspaceService(parkingspaceLoaderMock);
    parkingspaceService.relationships = { resolve: (parkingspace) => {} };
  });

  it('parkingspaceBySpaceId should return valid parkingspace', () => {
    parkingspaceLoaderMock.result = require('./SingleParkingspaceMockResult');
    const promise = parkingspaceService.parkingspaceBySpaceId(100082);
    return Promise.all([
      expect(promise).to.eventually.have.property('id', 100082),
      expect(promise).to.eventually.have.deep.property('address', { city: 'Frankfurt am Main', zipcode: '60329', street: 'Poststraße' }),     

    ]);
  });

  it.skip('parkingspaceBySpaceId with wrong spaceID should return null', () => {
    parkingspaceLoaderMock.result = require('./WrongSpaceIdMockResult');
    const promise = parkingspaceService.parkingspaceBySpaceId(1234567);
    return expect(promise).to.eventually.become(null);
  });

  it.skip('parkingspacesForStationNumber should return only parkingspaces of requested station', () => {
    parkingspaceLoaderMock.result = require('./AllSpacesMockResult');
    const promise = parkingspaceService.parkingspacesForStationNumber(1866);
    return Promise.all([
      expect(promise).to.eventually.have.property('station.primaryEvaId', 8000105),
    ]);
  });
});
