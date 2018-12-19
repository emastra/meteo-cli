const ora = require('ora');
const getWeather = require('../utils/weather');
const getIpLocation = require('../utils/ipLocation');
const getGeoLocation = require('../utils/geoLocation');

module.exports = async (args) => {
  const spinner = ora().start();

  try {
    const location = args.location || args.l || await getIpLocation();
    const geoData = await getGeoLocation(location);
    const weatherData = await getWeather(geoData.latitude, geoData.longitude);

    spinner.stop();

    console.log(`Current conditions in ${geoData.address}:`);
    console.log(`\t${weatherData.today.temperature}°F ${weatherData.today.summary}`);
  } catch (err) {
    spinner.stop();

    console.error(err);
  }
};
