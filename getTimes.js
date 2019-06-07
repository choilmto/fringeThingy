module.exports = contents => {
  try {
    const timesTable = contents
      .querySelector(".performances")
      .querySelector("tbody")
      .querySelectorAll("tr")
      .map(el => el.querySelectorAll("td"))
      .map(el => `${el[1].text} at ${el[2].text}`);
    return timesTable;
  } catch (e) {
    return `Couldn't find times.`;
  }
}
