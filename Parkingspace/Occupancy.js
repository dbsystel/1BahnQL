class Occupancy {
  constructor(occupancyData) {
    this.validData = occupancyData.validData;
    this.timestamp = occupancyData.timestamp;
    this.timeSegment = occupancyData.timeSegment;
    this.category = occupancyData.category;
    this.text = occupancyData.text;
  }
}

module.exports = Occupancy;
