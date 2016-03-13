
import _ from 'lodash';
import Promise from 'bluebird';
import superagent from 'superagent';

export function POST (uri, query) {
  return new Promise((resolve, reject) => {
    superagent
      .post(uri)
      .send(query)
      .set('Accept', 'application/json')
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
