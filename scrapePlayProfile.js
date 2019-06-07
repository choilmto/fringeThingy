const https = require("https");

module.exports = async (pageUrl) => {
  const playProfile = new Promise(resolve => {
    https.get(pageUrl, res => {
      res.setEncoding("utf8");
      let htmlPage = "";
      res.on("data", data => {
        htmlPage += data;
      });
      res.on("end", () => {
        resolve(htmlPage);
      });
    });
  });
  return await playProfile;
}
