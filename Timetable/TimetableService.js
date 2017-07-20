const moment = require('moment-timezone');
const TrainOnStation = require('./TrainOnStation.js');

const arrivalDepatingTypeKeyMap = { dp: 'nextDepatures', ar: 'nextArrivals' };

class TimetableService {

  constructor(timetableLoader) {
    this.timetableLoader = timetableLoader
  }

  timetableForEvaId(evaId) {
    return this.timetableLoader.timetableForEvaId(evaId)
      .then(json => {
        var result = { nextDepatures: [], nextArrivals: [] };
        json.elements[0].elements.map((element) => {
          const trainType = element.elements[0].attributes.c;
          const trainNumber = element.elements[0].attributes.n;
          let platform = element.elements[1].attributes.pp;
          let time = element.elements[1].attributes.pt;
          let stops = element.elements[1].attributes.ppth.split('|');
          let type = element.elements[1].name;
          let train = new TrainOnStation(trainType, trainNumber, time, platform, stops);
          result[arrivalDepatingTypeKeyMap[type]].push(train);
          if (element.elements.length > 2) {
            platform = element.elements[2].attributes.pp;
            time = element.elements[2].attributes.pt;
            type = element.elements[2].name;
            stops = element.elements[2].attributes.ppth.split('|');
            train = new TrainOnStation(trainType, trainNumber, time, platform, stops);
            result[arrivalDepatingTypeKeyMap[type]].push(train);
          }
        });
        result.nextDepatures = result.nextDepatures.sort((lhs, rhs) => lhs.time - rhs.time);
        result.nextArrivals = result.nextArrivals.sort((lhs, rhs) => lhs.time - rhs.time);

        return result
      });
  }
}

module.exports = TimetableService
