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
    parkingspaceService.relationships = new ParkingspaceRelationships(parkingspaceService, null);
  });

  describe('parkingspaceBySpaceId', () => {
    it('should return valid parkingspace', () => {
      parkingspaceLoaderMock.parkingspaceMockResult = require('./SingleParkingspaceMockResult');
      const promise = parkingspaceService.parkingspaceBySpaceId(100082);

      return Promise.all([
        expect(promise).to.eventually.have.property('id', 100082),
        expect(promise).to.eventually.have.deep.property('address', { city: 'Frankfurt am Main', zipcode: '60329', street: 'Poststraße' }),
      ]);
    });

    // Test will be added with correct error handling
    it('should return null for wrong spaceId', () => {
      parkingspaceLoaderMock.parkingspaceMockResult = require('./WrongSpaceIdMockResult');
      const promise = parkingspaceService.parkingspaceBySpaceId(1234567);

      return Promise.all([
        expect(promise).to.eventually.become(null),
      ]);
    });
  });


  describe('parkingspacesForStationNumber', () => {
    it('should return only parkingspaces of requested station', () => {
      parkingspaceLoaderMock.parkingspaceMockResult = require('./AllSpacesMockResult');
      const promise = parkingspaceService.parkingspacesForStationNumber(1866);

      return Promise.all([
        expect(promise).to.eventually.have.nested.property('[0].station.id', 1866),
      ]);
    });
  });

  describe('occupancyForSpaceId', () => {
    it('should return valid occupancy data', () => {
      parkingspaceLoaderMock.parkingspaceMockResult = require('./SingleParkingspaceMockResult');
      parkingspaceLoaderMock.occupancyMockResult = require('./OccupancyMockResult');
      const promise = parkingspaceService.parkingspaceBySpaceId(100082);

      return promise.then(space => Promise.all([
        expect(space.id).to.equal(100082),
        expect(space.occupancy().then()).to.eventually.have.property('text', '> 10'),
      ]));
    });
  });

  describe('nearbyParkingspaces', () => {
    it('should return only parkingspaces within radius', () => {
      parkingspaceLoaderMock.parkingspaceMockResult = require('./AllSpacesMockResult');
      const promise = parkingspaceService.nearbyParkingspaces(50.11, 8.66, 1000, 10, 0);

      return Promise.all([
        expect(promise).to.eventually.have.length.of(8),
        expect(promise).to.eventually.have.nested.property('[0].distance', 25.38),
        expect(promise).to.eventually.have.nested.property('[7].distance').to.be.below(1000),
      ]);
    });
  });
});
