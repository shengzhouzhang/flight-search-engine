
import _ from 'lodash';
import Promise from 'bluebird';
import superagent from 'superagent';

const BASE_URI = 'http://localhost:8080/';

export function GET (uri, query) {
  return new Promise((resolve, reject) => {
    superagent
      .get(uri)
      .set('Accept', 'application/json')
      .query(query)
      .end((err, res) => {
        if (err) { return reject(new Error(`request error: error=${err.message}`)); }
        if (res && (res.statusCode < 200 || res.statusCode >= 300 )) {
          return reject(new Error(`request error: statusCode=${res.statusCode}`));
        }
        if (res && !res.body) { return reject(new Error(`request error: body=${res.body}`)); }
        return resolve(res.body);
      });
  });
};
