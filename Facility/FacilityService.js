const Location = require('./../Location.js');
const Facility = require('./Facility.js')


class FacilityService {

  constructor(facilityLoader) {
    this.facilityLoader = facilityLoader
  }

  /**
	 * Loads list of facilities from the faSta API
	 * @param {int} stationNumber - The stationNumber for the station where the facilities are located.
	 * @return {Promise<Facilities>} promise of a list of  facilities
	 */
  facilitiesForStationNumber(stationNumber) {
    return this.facilityLoader.facilitiesForStationNumber(stationNumber)
    .then(facilities => {
      return facilities.map(facility => {
        let location;
        if (facility.geocoordY && facility.geocoordX) {
          location = new Location(facility.geocoordY, facility.geocoordX);
        }
        return new Facility(facility.description, facility.type,
          facility.state, location, facility.equipmentnumber);
      });
    });
  }
}

module.exports = FacilityService
