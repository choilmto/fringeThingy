const https = require("https");
const { parse } = require('node-html-parser');

module.exports = async (pageUrl) => {
  const blurb = new Promise(resolve => {
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
          const innerText = root.querySelector(".text-copy").querySelector("p").text;
          resolve(innerText);
        } catch (e) {
          resolve(`Couldn't find blurb.`);
        }
      });
    });
  });
  return await blurb;
}
