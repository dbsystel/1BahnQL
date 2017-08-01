const convert = require('xml-js');
const moment = require('moment-timezone');
const BaseLoader = require('./../Core/BaseLoader');

const serviceURL = '/timetables/v1';

class TimetableLoader extends BaseLoader {

  timetableForEvaId(evaId) {
    const now = moment();
    const nowString = now.format('YYMMDD/HH');
    const url = `${this.baseURL}${serviceURL}/plan/${evaId}/${nowString}`;
    const configuration = this.fetchConfiguration;
    return this.fetch(url, configuration)
      .then(res => res.text())
      .then(result => {
        const options = { ignoreComment: true, alwaysChildren: true };
        const json = JSON.parse(convert.xml2json(result, options));
        let timtetable = json.elements[0].elements
        if (!timtetable) {
          throw new Error("Error loading timetables");
        }
        return timtetable;
      }).catch(error => {throw new Error("Error loading timetables")});
  }
}

module.exports = TimetableLoader
