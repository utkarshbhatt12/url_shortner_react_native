'use strict';
const { db, admin } = require('./admin');
const url = require('url');

const validator = req => {
  if (req.method !== 'GET') {
    return `${req.method} is not allowed. Use 'GET'`;
  }

  return null;
};

const getSlugFromUrl = requestUrl => {
  const parsed = url.parse(requestUrl);

  return parsed
    .pathname
    .replace(/^\/+/g, '');
};

module.exports = async (req, res) => {
  const validationResult = validator(req);

  if (validationResult) {
    return res
      .status(400)
      .send({
        message: validationResult,
        success: false,
      });
  }

  const slug = getSlugFromUrl(req.url);

  console.log('slug', slug);

  try {
    const docQueryResult = await db.collection('urlMaps')
      .where('shortId', '==', slug)
      .limit(1)
      .get();

    if (docQueryResult.empty) {
      return res
        .status(404)
        .send(`
          <h1>Not found</h1>
        `);
    }

    const [doc] = docQueryResult.docs;
    const { originalUrl } = doc.data();

    await doc
      .ref
      .set({
        hits: admin.firestore.FieldValue.increment(1),
      }, { merge: true });

    return res
      .status(302)
      .redirect(originalUrl);
  } catch (error) {
    return res
      .status(500)
      .send({
        success: false,
        message: 'Something went wrong',
      })
  }
};
