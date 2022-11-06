const fs = require("fs");
const path = require("path");

fs.mkdir("06-build-page/project-dist", { recursive: true }, (err) => {
  if (err) throw err;
});
fs.mkdir("06-build-page/project-dist/assets", { recursive: true }, (err) => {
  if (err) throw err;
});

fs.writeFile("06-build-page/project-dist/index.html", "", (error) => {
  if (error) throw error;
});
fs.writeFile("06-build-page/project-dist/style.css", "", (error) => {
  if (error) throw error;
});

const stream = new fs.ReadStream(path.resolve("06-build-page/template.html"), {
  encoding: "utf-8",
});
stream.on("readable", function () {
  const data = stream.read();
  if (data != null) {
    let htmlString = data;
    const arr1 = htmlString.match(/{{[a-z]*}}/g);
    for (let index = 0; index < arr1.length; index++) {
      arr1[index] = arr1[index].slice(2, -2);
    }
    const arr2 = htmlString.split(/{{[a-z]*}}/g);
    for (let i = 0; i < arr1.length; i++) {
      const stream1 = new fs.ReadStream(
        path.resolve(`06-build-page/components/${arr1[i]}.html`),
        { encoding: "utf-8" }
      );
      stream1.on("readable", function () {
        const data = stream1.read();
        if (data != null) {
          fs.appendFile(
            "06-build-page/project-dist/index.html",
            arr2[i] + data,
            function (error) {
              if (error) throw error;
              if (arr1[i + 1] === undefined) {
                fs.appendFile(
                  "06-build-page/project-dist/index.html",
                  arr2[i + 1],
                  (error) => {
                    if (error) throw error;
                  }
                );
              }
            }
          );
        }
      });
    }
  }
});

const write = function () {
  fs.readdir("06-build-page/styles", "utf8", (err, files) => {
    if (err) throw err;
    files.forEach((element) => {
      if (path.parse(element).ext === ".css") {
        const stream = new fs.ReadStream(
          path.resolve(`06-build-page/styles/${element}`),
          { encoding: "utf-8" }
        );
        stream.on("readable", function () {
          const data = stream.read();
          if (data != null) {
            fs.appendFile(
              "06-build-page/project-dist/style.css",
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

fs.rm("06-build-page/project-dist/style.css", (err) => {
  if (err) throw err;
  setTimeout(write, 100);
});

let from = "06-build-page/assets";
let to = "06-build-page/project-dist/assets";

function deleteFiles(dir) {
  fs.readdir(dir, "utf8", (err, files) => {
    if (err) throw err;
    files.forEach((element) => {
      fs.stat(path.join(dir, element), (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) {
          fs.readdir(`${dir}/${element}`, function (err, data) {
            if (err) throw err;
            if (data.length == 0) {
              fs.rmdir(`${dir}/${element}`, (err) => {
                if (err) throw err;
              });
            } else {
              deleteFiles(`${dir}/${element}`);
            }
          });
        } else {
          fs.rm(`${dir}/${element}`, (err) => {
            if (err) throw err;
          });
        }
      });
    });
    setTimeout(() => {
      copyFiles(from, to);
    }, 100);
  });
}

const copyFiles = function (from, to) {
  fs.readdir(from, "utf8", (err, files2) => {
    if (err) throw err;
    files2.forEach((element) => {
      fs.stat(path.join(from, element), (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) {
          fs.mkdir(`${to}/${element}`, { recursive: true }, (err) => {
            if (err) throw err;
          });
          copyFiles(`${from}/${element}`, `${to}/${element}`);
        } else {
          fs.copyFile(`${from}/${element}`, `${to}/${element}`, (err) => {
            if (err) throw err;
          });
        }
      });
    });
  });
};

deleteFiles("06-build-page/project-dist/assets");
