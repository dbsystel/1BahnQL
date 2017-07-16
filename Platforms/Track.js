class Track {
	constructor(payload) {
		this.platform = payload.platform;
		this.number = parseInt(payload.trackNumber);
		this.name = payload.trackName;
		this.length = parseInt(payload.length);
		this.height = parseInt(payload.height);
	}
}

module.exports = Track