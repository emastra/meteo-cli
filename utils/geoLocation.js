// MUST return an object with props:
// body.results[0].formatted_address, body.results[0].geometry.location.lat, body.results[0].geometry.location.lng

const axios = require('axios');
const key = 'AIzaSyANaBPY5Qmw7GNUSy2SynVafvv6z4mYkSI';

const getGeoLocation = async (address) => {
  const encodedAddress = encodeURIComponent(address);
  const results = await axios({
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`
  }).catch((err) => {throw new Error('Unable to connect')});

  // check results
  if (results.data.status == 'REQUEST_DENIED')
    throw new Error(results.data.error_message);
  if (results.data.status == 'ZERO_RESULTS')
    throw new Error('Unable to find that location');

  const data = {
    address: results.data.results[0].formatted_address,
    latitude: results.data.results[0].geometry.location.lat,
    longitude: results.data.results[0].geometry.location.lng
  };

  return data;
};


module.exports = getGeoLocation;
