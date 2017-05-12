class OpeningTimes {
	constructor(staDatOpeningTimes) {
		for(var key in staDatOpeningTimes) {
	        if(staDatOpeningTimes.hasOwnProperty(key)) {
				var value = staDatOpeningTimes[key]
	            this[key] = new OpeningTime(value.fromTime, value.toTime)
	        }
	    }
	}
}

class OpeningTime {
	constructor(from, to) {
		this.from = from
		this.to = to
	}
}

module.exports = OpeningTimes