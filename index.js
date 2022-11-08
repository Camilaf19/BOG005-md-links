const fs = require('fs');
const path = require('path');


const pathFile = 'goodDirectory';

const absolutePath = (pathFile) => {
  let absolutePath;
  if (path.isAbsolute(pathFile)) {
    absolutePath = pathFile;
  }
  else {
    absolutePath = path.resolve(pathFile);
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
        // console.log(file, "aqui lo recorrió")
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
const arrayPaths = getFiles(pathFile);

const readFiles = (arrayPaths) => {
  return new Promise((resolve, reject) => {
    let arrayLinks = [];
    arrayPaths.forEach(file => {
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
          resolve(arrayLinks)
        }
      })
    })
  })
}


const fetch = require('node-fetch');

 const validateLinks = (arrayInfo) => {
  const linkStatus = arrayInfo.map((data) => {
    return fetch(data.href)
      .then(promise => {
        data.status = promise.status;
        data.message = promise.status <= 399 ? 'Ok' : 'Fail';
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



module.exports = { absolutePath, getFiles, readFiles, validateLinks  }
