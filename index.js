const fs = require('fs');
const path = require('path');


const pathFile = 'prueba.md';
// console.log(pathFile)

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
// console.log(absolutePath(pathFile))

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
// console.log(getFiles(pathFile));

const marked = require('marked');

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

// const arrayMds = getFiles(pathFile)
// // console.log('arrarMDS: ', arrayMds);
// readFiles(arrayMds).then((data) => {
//   console.log('read files index: ',data)
// })



module.exports = { absolutePath, getFiles, readFiles }
