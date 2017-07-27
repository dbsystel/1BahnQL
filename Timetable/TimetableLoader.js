const convert = require('xml-js');
const moment = require('moment-timezone');
const BaseLoader = require('./../Core/BaseLoader');


const baseURL = 'https://api.deutschebahn.com/timetables/v1';

class TimetableLoader extends BaseLoader {

  timetableForEvaId(evaId) {
    const now = moment();
    const nowString = now.format('YYMMDD/HH');
    const url = `${baseURL}/plan/${evaId}/${nowString}`;
    const configuration = this.fetchConfiguration;
    return this.fetch(url, configuration)
      .then(res => res.text())
      .then(result => {
        const options = { ignoreComment: true, alwaysChildren: true };
        return JSON.parse(convert.xml2json(result, options));
      });
  }
}

module.exports = TimetableLoader
