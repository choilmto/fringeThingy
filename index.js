const listGen = require('./listGen');
const getBlurb = require('./getBlurb');
const getTimes = require('./getTimes');
const getVenue = require('./getVenue');
const fileGen = require('./fileGen');

const urlForJune6To7 = '/home/cindy/Downloads/Fringe Schedule _ Toronto Fringe Festival.html';
const datesForJune6Or7 = ["6th July", "7th July"];
const pathForJune6To7 = "./htmlFiles/June6to7/play";
const urlForJune13To14 = '/home/cindy/Downloads/Fringe Schedule | Toronto Fringe Festival(2).html';
const datesForJune13Or14 = ["13th July", "14th July"];
const pathForJune13To14 = "./htmlFiles/June13to14/play";

playsOnJune6To7 = listGen(urlForJune6To7);
playsOneJune13To14 = listGen(urlForJune13To14);
fileGen(pathForJune6To7, playsOnJune6To7);
fileGen(pathForJune13To14, playsOneJune13To14);

const addBlurbsAndTimes = async (plays, weekend) => {
  const blurbs = await Promise.all(plays.map(el => getBlurb(el.url)));
  const times = await Promise.all(plays.map(el => getTimes(el.url)));
  const venues = await Promise.all(plays.map(el => getVenue(el.url)));
  const filteredTimes = times.map(el => Array.isArray(el)
    ? el.filter(innerEl => innerEl.startsWith(weekend[0]) || innerEl.startsWith(weekend[1]))
    : el);
  const blurbsAndTimes = blurbs.map((el, index) => {
    return {
      name: plays[index].name,
      blurb: el,
      times: filteredTimes[index],
      venue: venues[index]
    };
  });
  return blurbsAndTimes;
}
addBlurbsAndTimes(playsOnJune6To7, datesForJune6Or7).then(val => console.log(val));
