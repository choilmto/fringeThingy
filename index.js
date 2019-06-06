const listGen = require('./listGen');
const getBlurb = require('./getBlurb');

const pathForJune6To7 = '/home/cindy/Downloads/Fringe Schedule _ Toronto Fringe Festival.html';
const pathForJune13To14 = '/home/cindy/Downloads/Fringe Schedule | Toronto Fringe Festival(2).html';

playsOnJune6To7 = listGen(pathForJune6To7);
const addBlurbs = async plays => {
  const blurbs = await Promise.all(plays.map(el => getBlurb(el.url)));
  const blurbsAndPlays = blurbs.map((el, index) => {
    return { name: plays[index].name, blurb: el };
  });
  return blurbsAndPlays;
}
addBlurbs(playsOnJune6To7).then(val => console.log(val));
