const moment = require('moment-timezone');

class TrainOnStation {
  constructor(trainType, trainNumber, time, platform, stops) {
    this.type = trainType;
    this.trainNumber = trainNumber;
    this.time = new moment.tz(time, 'YYMMDDHHmm', 'Europe/Berlin').utc().toDate();
    this.platform = platform,
    this.stops = stops;
  }
}

module.exports = TrainOnStation;
