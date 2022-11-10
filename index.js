const fs = require('fs');
const path = require('path');


const pathFile = 'prueba.md';

const absolutePath = (pathFile) => {
  let absolutePath;
  if (!path.isAbsolute(pathFile)) {
    absolutePath = path.resolve(pathFile);
  }
  else {
    absolutePath = pathFile;
  }
  return absolutePath
}

const getFiles = (pathFile) => {
  const realPath = absolutePath(pathFile)
  let arrayPaths = [];
  //si es un archivo
  if (fs.statSync(realPath).isFile() === true && path.extname(realPath) === '.md') {
    arrayPaths.push(realPath);
  } else if (fs.statSync(realPath).isFile() && path.extname(realPath) !== '.md') {
    console.log("No es un archivo md")
  }
  else { //si es un directorio
    fs.readdirSync(realPath).forEach(file => {
      let pathDirectory = path.join(realPath, file);
      if (fs.statSync(realPath).isDirectory() === true) {
        arrayPaths = arrayPaths.concat(getFiles(pathDirectory))
       
      } else {
        if (path.extname(pathDirectory) === ".md") {
          arrayPaths.push(pathDirectory);
        }
      }
    })
  }
  return arrayPaths;
}

//console.log(getFiles(pathFile))

const marked = require('marked');
//const arrayPaths = getFiles(pathFile);

const readFiles = (file) => {
  return new Promise((resolve, reject) => {
    let arrayLinks = [];
   fs.readFile(file, "UTF-8", (err, data) => {
        if (err) {
          reject(err)
        } else {
          let renderer = new marked.Renderer();
          renderer.link = (href, title, text) => {
            let infoLinks = {
              'href': href,
              'text': text,
              'file': file,
            }
            if (infoLinks.href.includes('http')) {
              arrayLinks.push(infoLinks)
            }

          }
          marked.marked(data, { renderer })
         
        }
        resolve(arrayLinks)
      })
   
  })
}

const readAllFiles = (arrayLinks) => {
  let arrayPaths = arrayLinks.map((file) => {
    return readFiles(file)
  })
  return Promise.all(arrayPaths).then(response => response.flat())
}

const fetch = require('node-fetch');

 const validateLinks = (arrayLinks) => {
  const linkStatus = arrayLinks.map((data) => {
    return fetch(data.href)
      .then(element => {
        data.status = element.status;
        data.message = element.status <= 399 ? 'Ok' : 'Fail';
        return data;
      })
      .catch((error) => { 
      data.status = 'Not found' + " " + error;
        data.message = 'Fail';
        return data;
      })
  })
  return Promise.all(linkStatus);
}

function statsLinks(arrayLinks) {
  return {
      "Total": arrayLinks.length,
      "Unique": new Set(arrayLinks.map((link) => link.href)).size
  }    
}

const totalStatsLinks = (arrayLinks) => {
  const brokens = arrayLinks.filter((link) => link.message === 'Fail').length;
  return {
    "Total": arrayLinks.length,
    "Unique": new Set(arrayLinks.map((link) => link.href)).size,
    "Broken": brokens,
} 
}

module.exports = { 
  absolutePath, 
  getFiles, 
  readAllFiles, 
  validateLinks, 
  statsLinks, 
totalStatsLinks }
