const fs = require("fs");

import{copyFiles, deleteFiles} from '06-build-page/index.js'

fs.mkdir('04-copy-directory/files-copy', { recursive: true }, err => {
    if(err) throw err;
 });

 function deleteFiles(){
    fs.readdir('04-copy-directory/files-copy', 'utf8', (err, files) => {
    if (err) throw err;
    files.forEach(element => {
        fs.rm(`04-copy-directory/files-copy/${element}`, (err)=>{
            if (err) throw err;
        });
    });
    setTimeout(copyFiles, 100);
 });
 }

 const copyFiles = function(){
    fs.readdir('04-copy-directory/files', 'utf8', (err, files2) => {
    if (err) throw err;
    files2.forEach(element => {
        fs.copyFile(`04-copy-directory/files/${element}`, `04-copy-directory/files-copy/${element}`, (err)=>{
            if (err) throw err;
        });
    });
 });
 }

 deleteFiles();

