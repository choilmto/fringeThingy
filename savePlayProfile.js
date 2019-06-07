const fs = require('fs');

module.exports = (fileContents, index, basePath) => {
  fs.writeFileSync(`${basePath}${index}.html`,
    fileContents,
    err => {
      if(err) {
        return console.error(err)
      }
    });
}
