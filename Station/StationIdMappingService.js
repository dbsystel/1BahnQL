const stations = require('db-stations');

function stationNumberByAttribute(attibute, matchingAttribute) {
	var bool = false
    return new Promise((resolve) => {
		stations().on('data', (station) => {
	        if (station[attibute] == matchingAttribute) {
				bool = true
	          	resolve(station.nr);
	        }
      	}).on('end', () => {
			if (!bool) {
				resolve(null)
			}
      	});
    });
}

function stationNumberByEvaId(evaID) {
	return stationNumberByAttribute("id", evaID)
}

function stationNumberFromDS100(ds100) {
	return stationNumberByAttribute("ds100", ds100)
}

function stationNumbersByEvaIds(evaIDs) {
  return new Promise((resolve) => {
	var result = []
	  stations().on('data', (station) => {
	      if(evaIDs.find((id) => id == station.id)) {
	        result.push({nr: station.nr, id: station.id});
	      }
    }).on("end", function() {
    	resolve(result.sort((ids1, ids2) => evaIDs.indexOf(ids1.id) > evaIDs.indexOf(ids2.id)).map(ids => ids.nr))
    });
  });
}

module.exports = { stationNumbersByEvaIds, stationNumberFromDS100, stationNumberByEvaId }