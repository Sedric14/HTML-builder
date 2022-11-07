const fs = require("fs");
const path = require("path");

fs.writeFile("05-merge-styles/project-dist/bundle.css", "", function (error) {
  if (error) throw error;
});

const write = function () {
  fs.readdir("05-merge-styles/styles", "utf8", (err, files) => {
    if (err) throw err;
    files.forEach((element) => {
      if (path.parse(element).ext === ".css") {
        const stream = new fs.ReadStream(
          path.resolve(`05-merge-styles/styles/${element}`),
          { encoding: "utf-8" }
        );
        stream.on("readable", function () {
          const data = stream.read();
          if (data != null) {
            fs.appendFile(
              "05-merge-styles/project-dist/bundle.css",
              data,
              function (error) {
                if (error) throw error;
              }
            );
          }
        });
      }
    });
  });
};

fs.rm("05-merge-styles/project-dist/bundle.css", (err) => {
  if (err) throw err;
  write();
});
