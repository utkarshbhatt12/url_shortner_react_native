'use strict';
const {
  admin,
} = require('../admin');

const getIdTokenFromHeader = headers => {
  if (!headers.authorization || !headers.authorization.startsWith('Bearer ')) {
    return null;
  }

  return headers.authorization.split('Bearer ')[1];
};

const tokenVerifier = async headers => {
  try {
    const idToken = getIdTokenFromHeader(headers);
    console.log('idToken', idToken);

    if (!idToken) {
      return null;
    }

    const { uid } = await admin
      .auth()
      .verifyIdToken(idToken, true);

    console.log('uid', uid);

    return {
      uid,
    }
  } catch (err) {
    console.error(err);

    return null;
  }
};


module.exports = tokenVerifier;
