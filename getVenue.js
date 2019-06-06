const https = require("https");
const { parse } = require('node-html-parser');

module.exports = async (pageUrl) => {
  const venue = new Promise(resolve => {
    https.get(pageUrl, res => {
      res.setEncoding("utf8");
      let htmlPage = "";
      res.on("data", data => {
        htmlPage += data;
      });
      res.on("end", () => {
        const root = parse(htmlPage);
        try {
          const venueInfo = root.querySelector(".venue-info")
          const venueName = venueInfo.querySelector("h3").text;
          const venueAddress = venueInfo.querySelector(".venue-address").querySelector("p").text;
          resolve(
            {
              place: venueName,
              address: venueAddress
            });
        } catch (e) {
          resolve(`Couldn't find venue.`);
        }
      });
    });
  });
  return await venue;
}
