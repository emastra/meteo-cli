const ora = require('ora');
const getWeather = require('../utils/weather');
const getIpLocation = require('../utils/ipLocation');
const getGeoLocation = require('../utils/geoLocation');

// helpers
const formatDate = (timestamp) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'];
  const d = new Date(timestamp * 1000);

  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
}

const toCelsius = (fahrenheit) => {
  return Math.round((5/9) * (fahrenheit-32));
}


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
      console.log(`\t${date} - Low: ${toCelsius(day.temperatureLow)}° | High: ${toCelsius(day.temperatureHigh)}° | ${day.summary}`);
    });
    console.log();
    
  } catch (err) {
    spinner.stop()

    console.error(err)
  }
}
