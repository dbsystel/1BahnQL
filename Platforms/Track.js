class Track {
	constructor(payload) {
		this.platform = payload.platform;
		this.number = payload.trackNumber;
		this.name = payload.trackName;
		this.length = parseInt(payload.length);
		this.height = parseInt(payload.height);
		this.stationNumber = payload.stationNumber;
	}
}

module.exports = Track
