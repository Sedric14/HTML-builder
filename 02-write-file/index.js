const fs = require("fs");

fs.writeFile("02-write-file/hello.txt", "", function (error) {

  if (error) throw error;
});

const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

rl.question('Hello!\n', (answer) => {
  fs.appendFile("02-write-file/hello.txt", answer, function (error) {
    if (error) throw error;
  })

  rl.on('line', (input) => {
    fs.appendFile("02-write-file/hello.txt", ` ${input}`, function (error) {
      if (error) throw error;
    })
    if (input == 'exit') {
      console.log('GoodBye!');
      rl.close();
    }
  });
});