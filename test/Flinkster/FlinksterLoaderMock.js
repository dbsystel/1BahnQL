class FlinksterLoaderMock {
  constructor() {
    this.flinksterMockResult;
  }

  nearbyFlinksters(type, latitude, longitude, radius, count, offset) {
    return Promise.resolve(this.flinksterMockResult);
  }
}

module.exports = FlinksterLoaderMock;