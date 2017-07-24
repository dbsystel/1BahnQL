const Photographer = require('./Photographer');

class Picture {
  constructor(stationPicture) {
    this.id = stationPicture.id;
    this.url = stationPicture.photoUrl;
    this.license = stationPicture.license;
    this.photographer = new Photographer(stationPicture);
  }
}

module.exports = Picture;
