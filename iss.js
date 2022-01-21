/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP: ${body}`, null));
      return;
    }

    let ip = JSON.parse(body).ip;

    callback(null, ip);

  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP: ${body}`, null));
      return;
    }

    
    let coords = JSON.parse(body);
    let coordinates = {latitude: coords.latitude, longitude: coords.longitude};
    callback(null, coordinates);


  })
}

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${43.6319}&lon=${-79.3716}`, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP: ${body}`, null));
      return;
    }

    let pass = JSON.parse(body).response;
    callback(null, pass)
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

//module.exports = fetchMyIP;
//module.exports = fetchCoordsByIP;
//module.exports = fetchISSFlyOverTimes;
module.exports = nextISSTimesForMyLocation;