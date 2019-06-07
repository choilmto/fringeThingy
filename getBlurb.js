module.exports = contents => {
  try {
    const blurb = contents.querySelector(".text-copy").querySelector("p").text;
    return blurb;
  } catch (e) {
    return `Couldn't find blurb.`;
  }
}
