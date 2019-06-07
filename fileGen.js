const savePlayProfile = require('./savePlayProfile');
const scrapePlayProfile = require('./scrapePlayProfile');

module.exports = (path, listOfPlays) =>
  listOfPlays.forEach(async (el, index) => {
    const playProfile = await scrapePlayProfile(el.url);
    savePlayProfile(playProfile, index, path);
});
