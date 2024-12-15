const axios = require('axios');

const validateNPI = async (firstName, lastName, state, npiNumber) => {
  try {
    const response = await axios.get(process.env.NPI_API_BASE_URL, {
      params: {
        version: process.env.NPI_API_VERSION,
        first_name: firstName,
        last_name: lastName,
        state: state,
        number: npiNumber
      }
    });

    const results = response.data.results;
    return results.length > 0 &&
      results[0].basic.first_name.toLowerCase() === firstName.toLowerCase() &&
      results[0].basic.last_name.toLowerCase() === lastName.toLowerCase() &&
      results[0].addresses.some(addr => addr.state === state);
  } catch (error) {
    console.error('NPI Validation Error:', error);
    return false;
  }
};

module.exports = {
  validateNPI
};