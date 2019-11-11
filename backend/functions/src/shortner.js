'use strict';
const { admin, db } = require('./admin');
const crypto = require('crypto');
const url = require('url');
const validUrl = require('valid-url');
const tokenVerifier = require('./utils/tokenVerifier');


const validator = req => {
  if (req.method !== 'POST') {
    return `${req.method} is not allowed. Use 'POST'`;
  }

  if (!req.body.hasOwnProperty('url')) {
    return `Missing 'url' in the request body`;
  }

  if (!validUrl.isUri(req.body.url)) {
    return `Request body has invalid 'url'`;
  }

  return null;
}

const stripTrailingSlash = string => string
  .replace(/\/$/, '');

const getShortId = async () => {
  const shortId = crypto
    .randomBytes(16)
    .toString('hex')
    .substring(0, 9);

  // Avoid collision between generated ids.
  const isAvailable = (
    await db
      .collection('urlMaps')
      .where('shortId', '==', shortId)
      .limit(1)
      .get()
  ).empty;

  if (!isAvailable) {
    return getShortId();
  }

  return shortId;
};

const getCleanUrl = string => {
  const parsed = url.parse(string);
  const cleanUrl = `${parsed.protocol}`
    + `//${parsed.host}`
    + `${parsed.pathname}`;

  return stripTrailingSlash(cleanUrl);
};

const mapper = async context => db
  .collection('urlMaps')
  .doc()
  .set({
    hits: 0,
    createdAt: Date.now(),
    originalUrl: context.originalUrl,
    shortId: context.shortId,
    creator: context.uid,
  });

const shortner = async (req, res) => {
  const validatorResult = validator(req);

  console.log('body:', req.body);

  if (validatorResult) {
    return res
      .status(400)
      .json({
        success: false,
        message: validatorResult,
      });
  }

  const { url: originalUrl } = req.body;
  const shortId = await getShortId();

  await mapper({
    originalUrl,
    shortId,
    uid: res.locals.uid
  });

  return res
    .status(201)
    .json({ originalUrl, shortId });
};

module.exports = async (req, res) => {
  try {
    const authRecord = await tokenVerifier(req.headers);

    if (!authRecord) {
      return res
        .status(401)
        .send({
          success: false,
          message: 'Session invalid'
        });
    }

    res
      .locals = Object.assign({}, res.locals, {
        uid: authRecord.uid,
      });

    return shortner(req, res);
  } catch (error) {
    console.error({
      error,
      requestBody: req.body,
      headers: req.headers,
    });

    return res
      .status(500)
      .send({
        success: false,
        messge: 'Something went wrong'
      })
  }
}
