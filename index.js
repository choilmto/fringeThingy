const listGen = require('./listGen');
const getBlurb = require('./getBlurb');
const getTimes = require('./getTimes');

const pathForJune6To7 = '/home/cindy/Downloads/Fringe Schedule _ Toronto Fringe Festival.html';
const datesForJune6Or7 = ["6th July", "7th July"];
const pathForJune13To14 = '/home/cindy/Downloads/Fringe Schedule | Toronto Fringe Festival(2).html';

playsOnJune6To7 = listGen(pathForJune6To7);
const addBlurbsAndTimes = async (plays, weekend) => {
  const blurbs = await Promise.all(plays.map(el => getBlurb(el.url)));
  const times = await Promise.all(plays.map(el => getTimes(el.url)));
  const filteredTimes = times.map(el => Array.isArray(el)
    ? el.filter(innerEl => innerEl.startsWith(weekend[0]) || innerEl.startsWith(weekend[1]))
    : el);
  const blurbsAndTimes = blurbs.map((el, index) => {
    return {
      name: plays[index].name,
      blurb: el,
      times: filteredTimes[index]
    };
  });
  return blurbsAndTimes;
}
addBlurbsAndTimes(playsOnJune6To7, datesForJune6Or7).then(val => console.log(val));
