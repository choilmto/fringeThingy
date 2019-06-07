const fs = require('fs');

module.exports = (fileContents, index, basePath, type) => {
  fs.writeFileSync(`${basePath}${index}${type}`,
    fileContents,
    err => {
      if(err) {
        return console.error(err)
      }
    });
}
