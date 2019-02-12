// MUST return an object with props: currently.temperature, currently.summary

const axios = require('axios');
// darksky api key
const key = '28b9466934ef76164e49e9b510f5bb02';

const getWeather = async (lat, lng) => {
  try {
    const results = await axios({
      method: 'get',
      url: `https://api.darksky.net/forecast/${key}/${lat},${lng}`
    });
    const data = {
      today: {
        temperature: results.data.currently.temperature,
        summary: results.data.currently.summary
      },
      forecast: {
        summary: results.data.daily.summary,
        week: results.data.daily.data
      }
    }

    // everything returned by an async func is resolved!!
    return data;
  } catch(err) {
    throw new Error(err.message);
  }
};

// // Temp Tests (obviously works with both promise based or async getWeather function)
// getWeather('41.9027835', '12.4963655').then((data) => {
//   console.log(data);
// }).catch((err) => {
//   console.log(err.message)
// });

module.exports = getWeather;
