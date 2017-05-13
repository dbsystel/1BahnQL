'use strict';

class TravelCenter {
  
  constructor(travelCenterPayload) {
    this.id = travelCenterPayload.id;
    this.name = travelCenterPayload.name;
    this.address = travelCenterPayload.address;
    this.postCode = travelCenterPayload.postCode;
    this.city = travelCenterPayload.city;
    this.type = travelCenterPayload.type;
    this.lat = travelCenterPayload.lat;
    this.lon = travelCenterPayload.lon;
  }
}

module.exports = TravelCenter;
