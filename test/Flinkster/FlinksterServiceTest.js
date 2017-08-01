/* jslint node: true */
/* eslint-env mocha */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const FlinksterService = require('../../Flinkster/FlinksterService');
const FlinksterLoaderMock = require('./FlinksterLoaderMock');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('FlinksterService', () => {
  let flinksterLoaderMock = new FlinksterLoaderMock();
  let flinksterService = new FlinksterService(flinksterLoaderMock);

  beforeEach(() => {
    flinksterLoaderMock = new FlinksterLoaderMock();
    flinksterService = new FlinksterService(flinksterLoaderMock);
  });

  describe('Cars', () => {
    it('passes over correct parameters to loader', () => {
      const promise = flinksterService.nearbyFlinksterCars(50.11, 8.66, 1000, 10, 0);
      expect(flinksterLoaderMock.type).to.be.equal(1);
      expect(flinksterLoaderMock.latitude).to.be.equal(50.11);
      expect(flinksterLoaderMock.longitude).to.be.equal(8.66);
      expect(flinksterLoaderMock.radius).to.be.equal(1000);
      expect(flinksterLoaderMock.count).to.be.equal(10);
      expect(flinksterLoaderMock.offset).to.be.equal(0);
    })

    it('should return nearby cars', () => {
      flinksterLoaderMock.flinksterMockResult = require('./NearbyCarsMockResult');
      const promise = flinksterService.nearbyFlinksterCars(50.11, 8.66, 1000, 10, 0);

      return Promise.all([
        expect(promise).to.eventually.have.nested.property('[0].id', '4A8EF25D7CDBC02BB9D79823A847A3A6D717C6E7'),
        expect(promise).to.eventually.have.length.of(10),
      ]);
    });
  });

  describe('Bikes', () => {
    it('passes over correct parameters to loader', () => {
      const promise = flinksterService.nearbyFlinksterBikes(50.11, 8.66, 1000, 10, 0);
      expect(flinksterLoaderMock.type).to.be.equal(2);
      expect(flinksterLoaderMock.latitude).to.be.equal(50.11);
      expect(flinksterLoaderMock.longitude).to.be.equal(8.66);
      expect(flinksterLoaderMock.radius).to.be.equal(1000);
      expect(flinksterLoaderMock.count).to.be.equal(10);
      expect(flinksterLoaderMock.offset).to.be.equal(0);
    })
    it('should return nearby bikes', () => {
      flinksterLoaderMock.flinksterMockResult = require('./NearbyBikesMockResult');
      const promise = flinksterService.nearbyFlinksterBikes(50.11, 8.66, 1000, 10, 0);

      return Promise.all([
        expect(promise).to.eventually.have.nested.property('[0].id', 'CD6C50E89A09C65209E211C4143E8B3231ED9F04'),
        expect(promise).to.eventually.have.length.of(10),
      ]);
    });
  });

  describe.skip('Bikes And Cars', () => {
    it('should return nearby bikes and cars (mixed)', () => {
      flinksterLoaderMock.flinksterMockResult = require('./NearbyBikesAndCarsMockResult');
      const promise = flinksterService.nearbyFlinksterBikesAndCars(50.11, 8.66, 1000, 10, 0);

      return Promise.all([
        expect(promise).to.eventually.have.nested.property('[0].id', ''),
        expect(promise).to.eventually.have.length.of(10),
      ]);
    });
  });
});
