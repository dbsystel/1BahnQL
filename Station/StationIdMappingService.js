const stations = require('db-stations');

class StationIdMappingService {

  constructor() {
    //In Memory map for mapping. Could be faster.
    this.stationMap = new Promise((resolve) => {
      let stationMap = {evaId: {}, ds100: {}, stationNumber: {}}
      stations().on('data', (station) => {
        stationMap.evaId[station.id] = {stationNumber: station.nr, ds100: station.ds100}
        stationMap.ds100[station.ds100] = {stationNumber: station.nr, evaId: station.id}
        stationMap.stationNumber[station.nr] = {ds100: station.ds100, evaId: station.id}
      }).on('end', () => resolve(stationMap))
    })
  }

  stationNumberByAttribute(attibute, matchingAttribute) {
    return this.stationMap.then(map => (map[attibute][matchingAttribute] || {}).stationNumber)

    //Read alwasy file
    // let bool = false;
    // return new Promise((resolve) => {
    //   stations().on('data', (station) => {
  	//         if (station[attibute] === matchingAttribute) {
    //       bool = true;
  	//           	resolve(station.nr);
  	//         }
    //     	}).on('end', () => {
    //     if (!bool) {
    //       resolve(null);
    //     }
    //     	});
    // });
  }

  stationNumberByEvaId(evaID) {
    return this.stationNumberByAttribute('evaId', evaID);
  }

  stationNumberFromDS100(ds100) {
    return this.stationNumberByAttribute('ds100', ds100);
  }

  stationNumbersByEvaIds(evaIDs) {
    return new Promise((resolve) => {
      const result = [];
  	  stations().on('data', (station) => {
  	      if (evaIDs.find(id => id === station.id)) {
  	        result.push({ nr: station.nr, id: station.id });
  	      }
      }).on('end', () => {
      	resolve(result.sort((ids1, ids2) => evaIDs.indexOf(ids1.id) > evaIDs.indexOf(ids2.id)).map(ids => ids.nr));
      });
    });
  }
}



module.exports = StationIdMappingService;
