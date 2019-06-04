const { parse } = require('node-html-parser');
const fs = require('fs');

module.exports = (pathToHTMLFile) => {
  const playsAndUrls = (htmlPage) => {
    const root = parse(htmlPage);
    const plays = root.querySelectorAll('.schedule-entry-event-title').map(el => el.text);
    const getUrl = (el) => el.querySelector('.btn').rawAttributes.href;
    const playUrls = root.querySelectorAll('.schedule-entry-tickets').map(getUrl);
    const playsAndUrls = plays.map((el, index) => {
      return { name: el, url: playUrls[index] }
    });
    return playsAndUrls;
  }

  const uniqueListOfPlaysAndUrls = (initialList) => {
    const nameToUrl = (accumulator, element) => {
      const nameToUrl = Object.assign({[element.name]: element.url}, accumulator);
      return nameToUrl;
    }
    const hashedList = initialList.reduce(nameToUrl, {});
    const uniquePairs = Object.entries(hashedList);
    const uniqueListOfPlaysAndUrls = uniquePairs.map(el => {return { name: el[0], url: el[1] }});
    return uniqueListOfPlaysAndUrls;
  }

  const htmlFile = fs.readFileSync(pathToHTMLFile, 'utf8');
  const api = { uniquePlaysAndUrls: uniqueListOfPlaysAndUrls(playsAndUrls(htmlFile)) };
  const jsonOfApi = JSON.stringify(api);
  console.log("hi!");
}
