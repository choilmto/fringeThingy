const https = require("https");
const { parse } = require('node-html-parser');

module.exports = async (pageUrl) => {
  const times = new Promise(resolve => {
    https.get(pageUrl, res => {
      res.setEncoding("utf8");
      let htmlPage = "";
      res.on("data", data => {
        htmlPage += data;
      });
      res.on("end", () => {
        const root = parse(htmlPage);
        let innerText = "";
        try {
          const times = root
            .querySelector(".performances")
            .querySelector("tbody")
            .querySelectorAll("tr")
            .map(el => el.querySelectorAll("td"))
            .map(el => `${el[1].text} at ${el[2].text}`);
          resolve(times);
        } catch (e) {
          resolve(`Couldn't find times.`);
        }
      });
    });
  });
  return await times;
}
