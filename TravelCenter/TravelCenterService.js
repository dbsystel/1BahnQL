const TravelCenter = require('./TravelCenter');
class TravelCenterService {
  constructor(travelCenterLoader) {
    this.travelCenterLoader = travelCenterLoader
  }

  transformResultIntoTravleCenter(result) {
    return new TravelCenter(result);
  }

  travelCenterAtLocation(latitude, longitude, radius) {
    const self = this;
    return this.travelCenterLoader.travelCenterAtLocation(latitude, longitude)
    .then(result => [self.transformResultIntoTravleCenter(result)])
    .then(travelCenters => travelCenters.filter(center => calculateDistance(latitude, longitude, center.location.latitude, center.location.longitude) <= radius))
  }

}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const radlon1 = Math.PI * lon1 / 180;
  const radlon2 = Math.PI * lon2 / 180;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;

  // Miles to Kilometers
  dist *= 1.609344;

  return dist;
}

module.exports = TravelCenterService
