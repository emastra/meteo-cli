const ora = require('ora');
const getWeather = require('../utils/weather');
const getIpLocation = require('../utils/ipLocation');
const getGeoLocation = require('../utils/geoLocation');
const toCelsius = require('../utils/convertToCelsius');
const formatDate = require('../utils/formatDate');

module.exports = async (args) => {
  const spinner = ora().start()

  try {
    const location = args.location || args.l || await getIpLocation();
    const geoData = await getGeoLocation(location);
    const weatherData = await getWeather(geoData.latitude, geoData.longitude);

    spinner.stop();

    console.log(`\nForecast for ${geoData.address}:`);
    console.log(`\tWeek summary - ${weatherData.forecast.summary}`);
    weatherData.forecast.week.forEach(day => {
      let date = formatDate(day.time);
      console.log(`\t${date} - Low: ${toCelsius(day.temperatureLow)}°C | High: ${toCelsius(day.temperatureHigh)}°C | ${day.summary}`);
    });
    console.log();

  } catch (err) {
    spinner.stop()

    console.error(err)
  }
}
