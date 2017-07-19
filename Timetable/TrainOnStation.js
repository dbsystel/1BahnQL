class TrainOnStation {
  constructor(trainType, trainNumber, timeStampString, platform, stops) {
    this.type = trainType;
    this.trainNumber = trainNumber;
    this.time = timeStampString;
    this.platform = platform,
    this.stops = stops;
  }
}

module.exports = TrainOnStation;
