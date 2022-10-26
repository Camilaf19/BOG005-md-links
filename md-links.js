const { absolutePath, getFiles} = require("./index.js"); 
const pathFile = 'goodDirectory';
const path = require('path');

 const mdLinks = (pathFile, options) => {
    return new Promise((resolve, reject) => { 
if (!path.isAbsolute(pathFile)) {
    resolve(absolutePath(pathFile))
} 
    })
    }
 
  mdLinks(pathFile).then((pathFile) => {
    console.log(mdLinks(pathFile))
  })

 
