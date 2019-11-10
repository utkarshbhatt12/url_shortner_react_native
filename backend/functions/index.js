const functions = require('firebase-functions');

const shortner = require('./src/shortner');
const stats = require('./src/stats');
const redirector = require('./src/redirector');
const history = require('./src/history');

module
  .exports = {
  shortner: functions.https.onRequest(shortner),
  stats: functions.https.onRequest(stats),
  redirector: functions.https.onRequest(redirector),
  history: functions.https.onRequest(history),
}
