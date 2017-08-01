class FlinksterLoaderMock {
  constructor() {
    this.flinksterMockResult;
  }

  nearbyFlinksters(type, latitude, longitude, radius, count, offset) {
    this.type = type;
    this.latitude = latitude;
    this.longitude = longitude;
    this.radius = radius;
    this.count = count;
    this.offset = offset;
    return Promise.resolve(this.flinksterMockResult);
  }
}

module.exports = FlinksterLoaderMock;