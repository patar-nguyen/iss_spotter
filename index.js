// const fetchMyIP= require('./iss');
//const fetchCoordsByIP = require('./iss');
//const fetchISSFlyOverTimes = require('./iss');
const nextISSTimesForMyLocation = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error){
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP: ", ip);
// });

// fetchCoordsByIP('99.211.3.140', (error, coordinates) => {
//   if (error){
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned coordinates: ", coordinates);
// });

// fetchISSFlyOverTimes('{ latitude: 43.6319, longitude: -79.3716 }', (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned flyover times: ", passTimes);
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});