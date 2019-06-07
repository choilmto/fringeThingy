module.exports = contents => {
  try {
    const venueInfo = contents.querySelector(".venue-info")
    const venueName = venueInfo.querySelector("h3").text;
    const venueAddress = venueInfo.querySelector(".venue-address").querySelector("p").text;
    return (
      {
        place: venueName,
        address: venueAddress
      });
  } catch (e) {
    return `Couldn't find venue.`;
  }
}
