const fetch = require("node-fetch")
var convert = require('xml-js');
var moment = require('moment-timezone');

class TrainOnStation {
	constructor(trainType, trainNumber, timeStampString, platform, stops) {
		this.type = trainType
		this.trainNumber = trainNumber
		this.time = timeStampString
		this.platform = platform,
		this.stops = stops
	}
}
const arrivalDepatingTypeKeyMap = {dp: "nextDepatures", ar: "nextArrivals"}
function loadTimeTableFor(evaId) {
	let now = moment()
	let nowString = now.format("YYMMDD/HH")
	let url = "https://api.deutschebahn.com/timetables/v1/plan/" + evaId + "/" + nowString
	var myInit = { method: 'GET',
	headers: {"Authorization": "Bearer 56ea8e077d1a829c588a2af479863601" }};
	return fetch(url, myInit)
	.then(function(res) {
		return res.text()
	}).then(function(result) {
		var options = {ignoreComment: true, alwaysChildren: true};
		var json = JSON.parse(convert.xml2json(result, options));
		var result = {nextDepatures: [], nextArrivals: [] }
		json.elements[0].elements.map(function(element) {
			var trainType = element.elements[0].attributes.c
			var trainNumber = element.elements[0].attributes.n
			var platform = element.elements[1].attributes.pp
			var time = element.elements[1].attributes.pt
			var stops = element.elements[1].attributes.ppth.split("|")
			var type = element.elements[1].name
			var train = new TrainOnStation(trainType, trainNumber, new moment.tz(time, "YYMMDDHHmm", "Europe/Berlin").utc().toDate(), platform, stops)
			result[arrivalDepatingTypeKeyMap[type]].push(train)
			if (element.elements.length > 2) {
				platform = element.elements[2].attributes.pp
				time = element.elements[2].attributes.pt
				type = element.elements[2].name
				stops = element.elements[2].attributes.ppth.split("|")
				train = new TrainOnStation(trainType, trainNumber, new moment.tz(time, "YYMMDDHHmm", "Europe/Berlin").utc().toDate(), platform, stops)
				result[arrivalDepatingTypeKeyMap[type]].push(train)
			}
		})
		console.log(result)
		// json.elements[].elements.map(function(element) {
// 			var trainType = element.elements[0].attributes.c
// 			var trainNumber = element.elements[0].attributes.n
// 			var platform = element.elements[1].attributes.pp
// 			var time = element.elements[1].attributes.pt
// 			var type = element.elements[1].name
// 			console.log(type)
// 			var train = new TrainOnStation(trainType, trainNumber, new moment.tz(time, "YYMMDDHHmm", "Europe/Berlin").utc().toDate(), platform)
// 			result[arrivalDepatingTypeKeyMap[type]].push(train)
// 		})
		return result
	})
}

function parseX() {
	var platform = element.elements[1].attributes.pp
	var time = element.elements[1].attributes.pt
	var type = element.elements[1].name
}

module.exports = { loadTimeTableFor }