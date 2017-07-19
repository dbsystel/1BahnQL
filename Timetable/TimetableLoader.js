const fetch = require('node-fetch');
const convert = require('xml-js');
const moment = require('moment-timezone');

const baseURL = 'https://api.deutschebahn.com';

class TimetableLoader {
  constructor(APIToken) {
    this.APIToken = APIToken;
  }

  timetableForEvaId(evaId) {
    const now = moment();
    const nowString = now.format('YYMMDD/HH');
    const url = `${baseURL}/timetables/v1/plan/${evaId}/${nowString}`;
    const myInit = { method: 'GET',
      headers: { Authorization: `Bearer ${this.APIToken}` } };
    return fetch(url, myInit)
      .then(res => res.text())
      .then(result => {
        const options = { ignoreComment: true, alwaysChildren: true };
        return JSON.parse(convert.xml2json(result, options));
      });
  }
}

module.exports = TimetableLoader
