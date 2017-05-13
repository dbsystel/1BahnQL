'use strict';

const MailAddress = require('./mailAddress');

class TravelCenter {
  
  constructor(travelCenterPayload) {
    this.id = travelCenterPayload.id;
    this.name = travelCenterPayload.name;
    this.address = new MailAddress(travelCenterPayload.city, travelCenterPayload.postCode, travelCenterPayload.address);
    this.type = travelCenterPayload.type;
    this.lat = travelCenterPayload.lat;
    this.lon = travelCenterPayload.lon;
  }
}

module.exports = TravelCenter;
