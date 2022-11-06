const path = require('path');
const fs = require("fs");

fs.readdir('03-files-in-folder/secret-folder', 'utf8', (err, files) => {
  if (err) throw err;
  for (let i = 0; i < files.length; i++) {
    const name = path.parse(files[i]).name;
    const extname = path.parse(files[i]).ext.slice(1);
    fs.stat(path.join('03-files-in-folder/secret-folder', files[i]), (err, stats) => {
      if (err) throw err;
      if (!stats.isDirectory()) {
        const size = stats.size/1000;
        console.log(`${name} - ${extname} - ${size}kb`);
      }
    });
  }
});