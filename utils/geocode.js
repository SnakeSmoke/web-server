const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiY2hyaWxsZXNuaWxsZSIsImEiOiJjazlnemJraTEwNzQ3M2tueDU4cTZka2VtIn0.L0NFkP2TGd0yD4jOplpzxA`;

  request({ url, json: true }, (error, { body = {} }) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (body.features.length === 0) {
      callback("Unable to find location! Try again");
    } else {
      const longitude = body.features[0].center[0];
      const latitude = body.features[0].center[1];
      const location = body.features[0].place_name;
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geocode;
