class OpeningTimes {
  constructor(staDatOpeningTimes) {
    for (const key in staDatOpeningTimes) {
	        if (staDatOpeningTimes.hasOwnProperty(key)) {
        const value = staDatOpeningTimes[key];
	            this[key] = new OpeningTime(value.fromTime, value.toTime);
	        }
	    }
  }
}

class OpeningTime {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
}

module.exports = OpeningTimes;
