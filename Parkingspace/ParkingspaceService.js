// Models
const Parkingspace = require('./Parkingspace');
const Occupancy = require('./Occupancy');

class ParkingspaceService {
  constructor(parkingspaceLoader) {
    this.parkingspaceLoader = parkingspaceLoader;
    this.relationships;
  }

  transformResultIntoParkingspace(jsonData) {
    if (jsonData) {
      const parkingspace = new Parkingspace(jsonData, this);
      this.relationships.resolve(parkingspace);
      return parkingspace;
    }
    return null;
  }

  transformResultIntoOccupancy(jsonData) {
    if (jsonData) {
      return new Occupancy(jsonData);
    }
    return null;
  }

  parkingspaceBySpaceId(spaceId) {
    const self = this;
    return this.parkingspaceLoader.spaceById(spaceId).then((parkingspace) => {
      if (parkingspace.code == 4100) {
        return null;
      }

      return self.transformResultIntoParkingspace(parkingspace);
    });
  }

  occupancyForSpaceId(spaceId) {
    const self = this;
    return this.parkingspaceLoader.occupancyForId(spaceId).then((occupancyData) => {
      if (occupancyData.code === 5101) {
        return null;
      }

      return self.transformResultIntoOccupancy(occupancyData.allocation);
    });
  }

  parkingspacesForStationNumber(stationNumber) {
    const self = this;
    return this.parkingspaceLoader.spacesForStationNumber(stationNumber).then(parkingspaces => parkingspaces.items.filter((parkingspace) => {
      if (parkingspace.station.id == stationNumber) {
        return self.transformResultIntoParkingspace(parkingspace);
      }
    }));
  }

  nearbyParkingspaces(latitude, longitude, radius, count, offset) {
    const self = this;
    return this.parkingspaceLoader.nearbyParkingspaces(latitude, longitude, radius).then((parkingspaces) => {
      // Filter based on geo and radius

      if (parkingspaces.count > 0) {
        // Sort by distance
        // geolib.orderByDistance(object latlng, mixed coords)
        const mapped = parkingspaces.items.filter((elem) => {
          if (elem.geoLocation) {
            elem.distance = parseFloat((calculateDistance(latitude, longitude, parseFloat(elem.geoLocation.latitude), parseFloat(elem.geoLocation.longitude)) * 100).toFixed(2), 2);

            if (elem.distance <= radius) {
              return elem;
            }
          }
        });

        // sort by distance
        mapped.sort((elem1, elem2) => elem1.distance - elem2.distance);
        return mapped.slice(offset, offset + count).map(parkingspace => self.transformResultIntoParkingspace(parkingspace));
      }
      return [];
    });
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

module.exports = ParkingspaceService;
