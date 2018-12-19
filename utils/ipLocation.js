const axios = require('axios');

const key = '031dbbd78ae23a70d0026b02d31066a0cdea7aea3fafa9c00ea7a888';

module.exports = async () => {
  try {
    const results = await axios({
      method: 'get',
      url: `https://api.ipdata.co?api-key=${key}`,
    });

    const { city, region } = results.data;
    return `${city}, ${region}`;
  } catch(err) {
    throw new Error(err);
  }
};
