const fs = require('fs');
const path = require('path');

const stream = new fs.ReadStream(path.resolve('01-read-file/text.txt'), {encoding: 'utf-8'});
 
stream.on('readable', function(){
    const data = stream.read();
    if(data != null) console.log(data);
});
