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
  console.log('before fetch');
  const result = await fetch(urlMaster.CREATE_NEW, {
    body: {
      originalUrl,
    },
    method: 'POST',
  });

  console.log('after fetch');

  const {message, success} = await result.json();
  console.log(message, success);

  return {message, success};
};

const getHistory = async uid => {
  const result = await fetch(urlMaster.GET_HISTORY);
  const {message, success} = await result.json();

  if (!result.status.toString().startsWith('2')) {
    throw new Error('Request rejected', message);
  }

  return message.urlHistory;
};

const ApiCaller = async (action, params) => {
  try {
    if (action === 'CREATE') {
      console.log('Creator called');
      return getNewShortUrl(params.originalUrl);
    }

    if (action === 'GET_STATS') {
      return getUrlStats(params.urlToCheck);
    }

    if (action === 'GET_HISTORY') {
      return getHistory(params.uid);
    }

    console.log('ApiCaller called with invalid params');
  } catch (error) {
    console.error('error', error);
  }
};

export default ApiCaller;
