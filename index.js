const fs = require('fs');
const path = require('path');
//const { marked } = require('marked');

const pathFile = 'goodDirectory';
console.log(pathFile)

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
console.log(absolutePath(pathFile))

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
        console.log(file, "aqui lo recorrió")
      } else {
        if (path.extname(pathDirectory) === ".md") {
          arrayPaths.push(pathDirectory);
        }
      }
    })
  }
  return arrayPaths;
}
console.log(getFiles(pathFile));

const readFiles = (arrayPaths) => {
  return new Promise((resolve, reject) => {
    arrayPaths.forEach(file => {
      fs.readFile(file, "utf8", (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data);
        }

      });
    })
  })
}

readFiles(getFiles(pathFile)).then((data) => {
  console.log(data)

})
  


module.exports = { absolutePath, getFiles }
