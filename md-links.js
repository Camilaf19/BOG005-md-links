const { absolutePath, getFiles, readFiles } = require("./index.js");
const pathFile = 'prueba.md';
const path = require('path');

const mdLinks = (pathFile, options={validate:false}) => {
  return new Promise((resolve, reject) => {
    const callAbsolutePath = absolutePath(pathFile)
    const callGetFiles = getFiles(callAbsolutePath)
    readFiles(callGetFiles).then((callReadFiles) => {
      resolve(callReadFiles)
    })

  })
}

mdLinks(pathFile).then((result) => {
  console.log("aqui es mdlinks", result)
})


