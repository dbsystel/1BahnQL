const fetch = require('node-fetch');
const convert = require('xml-js');
const moment = require('moment-timezone');

const APIToken = process.env.DBDeveloperAuthorization;


const arrivalDepatingTypeKeyMap = { dp: 'nextDepatures', ar: 'nextArrivals' };
function loadTimeTableFor(evaId) {
  const now = moment();
  const nowString = now.format('YYMMDD/HH');
  const url = `https://api.deutschebahn.com/timetables/v1/plan/${evaId}/${nowString}`;
  const myInit = { method: 'GET',
    headers: { Authorization: `Bearer ${APIToken}` } };
  return fetch(url, myInit)
    .then(res => res.text()).then((result) => {
      const options = { ignoreComment: true, alwaysChildren: true };
      const json = JSON.parse(convert.xml2json(result, options));
      var result = { nextDepatures: [], nextArrivals: [] };
      json.elements[0].elements.map((element) => {
        const trainType = element.elements[0].attributes.c;
        const trainNumber = element.elements[0].attributes.n;
        let platform = element.elements[1].attributes.pp;
        let time = element.elements[1].attributes.pt;
        let stops = element.elements[1].attributes.ppth.split('|');
        let type = element.elements[1].name;
        let train = new TrainOnStation(trainType, trainNumber, new moment.tz(time, 'YYMMDDHHmm', 'Europe/Berlin').utc().toDate(), platform, stops);
        result[arrivalDepatingTypeKeyMap[type]].push(train);
        if (element.elements.length > 2) {
          platform = element.elements[2].attributes.pp;
          time = element.elements[2].attributes.pt;
          type = element.elements[2].name;
          stops = element.elements[2].attributes.ppth.split('|');
          train = new TrainOnStation(trainType, trainNumber, new moment.tz(time, 'YYMMDDHHmm', 'Europe/Berlin').utc().toDate(), platform, stops);
          result[arrivalDepatingTypeKeyMap[type]].push(train);
        }
      });

      return result;
    });
}

function parseX() {
  const platform = element.elements[1].attributes.pp;
  const time = element.elements[1].attributes.pt;
  const type = element.elements[1].name;
}

module.exports = { loadTimeTableFor };
