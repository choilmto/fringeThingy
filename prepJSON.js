const listGen = require('./listGen');
const getBlurb = require('./getBlurb');
const getTimes = require('./getTimes');
const getVenue = require('./getVenue');
const fileWrite = require('./fileWrite');
const fs = require('fs');
const { parse } = require('node-html-parser');
const saveFile = require('./savePlayProfile');

const url = './Fringe Schedule _ Toronto Fringe Festival.html';
const datesForJune6Or7 = ["6th July", "7th July"];
const path = "./htmlFiles/play";
const datesForJune13Or14 = ["13th July", "14th July"];

plays = listGen(url);
fileWrite(path, plays, ".html");

const addBlurbsAndTimes = async (plays, weekend, path) => {
  return plays.map((el, index) => {
    const dom = parse(fs.readFileSync(`${path}${index}.html`, 'utf8'));
    const times = getTimes(dom);
    const filteredTimes = Array.isArray(times)
      ? times.filter(innerEl => innerEl.startsWith(weekend[0]) || innerEl.startsWith(weekend[1]))
      : times;
    console.log(filteredTimes);
    return {
      name: el.name,
      blurb: getBlurb(dom),
      times: filteredTimes,
      venue: getVenue(dom)
    }
  })
};

addBlurbsAndTimes(plays, datesForJune6Or7, path).then(
  val => {saveFile(JSON.stringify(val), "", "./playsOnJune6Or7", ".json");}
);
addBlurbsAndTimes(plays, datesForJune13Or14, path).then(
  val => saveFile(JSON.stringify(val), "", "./playsOnJune13Or14", ".json")
);
