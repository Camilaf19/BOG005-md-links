const fs = require('fs');
const path = require('path');

const pathFile = 'goodDirectory';
console.log(pathFile)

const absolutPath = (pathFile) => {
  let absolutPath;
  if (path.isAbsolute(pathFile)) {
    absolutPath = pathFile;
  }
  else {
    absolutPath = path.resolve(pathFile);
  }
  return absolutPath
}
console.log(absolutPath(pathFile))


function getFiles(pathFile) {
  const realPath = absolutPath(pathFile)
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
        console.log(file, "aqui lo recorrió")
        if (path.extname(pathDirectory) === ".md") {
          arrayPaths.push(pathDirectory);
        }
      }
    })   
  }
  return arrayPaths;
}
console.log(getFiles(pathFile));

module.exports = {

}
