'use strict';

const {
  db,
} = require('./admin');
const tokenVerifier = require('./utils/tokenVerifier');

const validator = req => {
  if (req.method !== 'GET') {
    return `${req.method} is not allowed. Use 'GET'`;
  }

  return null;
};

const history = async (req, res) => {
  const validationResult = validator(req);

  if (validationResult) {
    return res
      .status(400)
      .send({
        success: false,
        message: validationResult,
      });
  }

  const authorizationHeaderValidation = await tokenVerifier(req.headers);

  if (!authorizationHeaderValidation) {
    return res
      .status(401)
      .send({
        success: false,
        message: 'Session invalid'
      });
  }

  try {
    const docs = await db
      .collection('urlMaps')
      .where('creator', '==', authorizationHeaderValidation.uid)
      .select('createdAt', 'hits', 'originalUrl', 'shortId')
      .get();

    const links = docs
      .docs
      .map(doc => doc.data());

    return res
      .status(200)
      .send({
        links,
        success: true,
      })
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .send({
        success: false,
        message: 'Something went wrong',
      })
  }
};

module.exports = history;
