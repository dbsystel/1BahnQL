const MailAddress = require('./../mailAddress');
const Location = require('./../location');

class TravelCenter {
  constructor(travelCenterPayload) {
    this.id = travelCenterPayload.id;
    this.name = travelCenterPayload.name;
    this.address = new MailAddress(travelCenterPayload.city, travelCenterPayload.postCode, travelCenterPayload.address);
    this.type = travelCenterPayload.type;
    this.location = new Location(travelCenterPayload.lat, travelCenterPayload.lon);
  }
}

module.exports = TravelCenter;
