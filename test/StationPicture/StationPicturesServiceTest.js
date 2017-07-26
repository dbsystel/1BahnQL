/* jslint node: true */
/* eslint-env mocha */

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const StationPictureLoaderMock = require('./StationPictureLoaderMock');
const StationPictureService = require('./../../StationPicture/StationPictureService');


describe('StationPictureService', () => {
  var stationPictureLoaderMock = new StationPictureLoaderMock();
  let stationPictureServcie = new StationPictureService(stationPictureLoaderMock);

  beforeEach(function() {
    stationPictureLoaderMock = new StationPictureLoaderMock();
    stationPictureServcie = new StationPictureService(stationPictureLoaderMock);
  });

  it('stationPictureForStationNumber should return valid station', () => {
    stationPictureLoaderMock.result = require('./StationPictureMockResult');
    let promise = stationPictureServcie.stationPictureForStationNumber(1)

    return Promise.all([
        expect(promise).to.eventually.have.property("id", 1973),
        expect(promise).to.eventually.have.property("url", 'https://railway-stations.org/sites/default/files/previewbig/1973.jpg'),
        expect(promise).to.eventually.have.property("license", 'CC0 1.0 Universell (CC0 1.0)'),
        expect(promise).to.eventually.have.deep.property("photographer", { name: '@storchp', url: 'https://railway-stations.org/node/40' })

    ]);
  });


});
