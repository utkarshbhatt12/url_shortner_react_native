const admin = require('firebase-admin');
const sacRef = require('../src/service_acc');

admin.initializeApp({
  credential: admin.credential.cert(sacRef),
});

const db = admin.firestore();

module.exports = {
  admin,
  db,
};
