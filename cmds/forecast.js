const ora = require('ora');
const getWeather = require('../utils/weather');
const getIpLocation = require('../utils/ipLocation');
const getGeoLocation = require('../utils/geoLocation');

module.exports = async (args) => {
  const spinner = ora().start()

  try {
    const location = args.location || args.l || await getIpLocation();
    const geoData = await getGeoLocation(location);
    const weatherData = await getWeather(geoData.latitude, geoData.longitude);
    const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    spinner.stop();

    console.log(`Forecast for ${geoData.address}:`);
    console.log(`\tWeek summary - ${weatherData.forecast.summary}`);
    weatherData.forecast.week.forEach(day => {
      var date = new Date(day.time * 1000);
      let weekDay = weekDays[date.getDay()];
      console.log(`\t${weekDay} - Low: ${day.temperatureLow}° | High: ${day.temperatureHigh}° | ${day.summary}`);
    });
  } catch (err) {
    spinner.stop()

    console.error(err)
  }
}
