const Picture = require('./Picture');

class StationPictureService {
  constructor(stationPictureLoader) {
    this.stationPictureLoader = stationPictureLoader;
  }

  transformResult(jsonStationPicture) {
    if (jsonStationPicture) {
      const picture = new Picture(jsonStationPicture);
      return picture;
    }
    return null;
  }

  stationPictureForStationNumber(stationNumber) {
    const self = this;
    return this.stationPictureLoader.stationPictureForStationNumber(stationNumber)
      .then(pictureJSON => self.transformResult(pictureJSON));
  }
}

module.exports = StationPictureService;
