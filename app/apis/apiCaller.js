import {resolve} from 'url';

const urlMaster = {
  CREATE_NEW:
    'https://us-central1-contactform-1b262.cloudfunctions.net/shortner',
  GET_STATS: 'https://us-central1-contactform-1b262.cloudfunctions.net/stats',
  GET_HISTORY:
    'https://us-central1-contactform-1b262.cloudfunctions.net/history',
};

const getUrlStats = async urlToCheck => {
  const result = await fetch(urlToCheck);
  const {message, success} = await result.json();

  if (!result.status.toString().startsWith('2')) {
    throw new Error('Request rejected', message);
  }

  return {message, success};
};

const getNewShortUrl = async originalUrl => {
  const uri = resolve(urlMaster.CREATE_NEW);
  const result = await fetch(uri, {
    originalUrl,
    method: 'POST',
  });

  const {message, success} = await result.json();

  if (!result.status.toString().startsWith('2')) {
    throw new Error('Request rejected', message);
  }

  return {message, success};
};

const getHistory = async uid => {
  const uri = urlMaster.GET_HISTORY;
  const result = await fetch(uri);
  const {message, success} = await result.json();

  if (!result.status.toString().startsWith('2')) {
    throw new Error('Request rejected', message);
  }

  return message.urlHistory;
};

const ApiCaller = async (action, params) => {
  try {
    if (action === 'CREATE') {
      return getNewShortUrl(params.originalUrl);
    }

    if (action === 'GET_STATS') {
      return getUrlStats(params.urlToCheck);
    }

    if (action === 'GET_HISTORY') {
      return getHistory(params.uid);
    }
  } catch (error) {
    console.error('error', error);
  }
};

export default ApiCaller;
