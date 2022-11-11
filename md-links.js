const { absolutePath, getFiles, readAllFiles, validateLinks } = require("./index.js");

const mdLinks = (pathFile, options = { validate: false }) => {
  return new Promise((resolve) => {
    const callAbsolutePath = absolutePath(pathFile)
    const callGetFiles = getFiles(callAbsolutePath)
    readAllFiles(callGetFiles).then((callReadFiles) => {
      if (options.validate === false) { 
        resolve(callReadFiles)
      } else {
        validateLinks(callReadFiles).then((response) => {
          resolve(response)
        })

      }
    })

  })
}

module.exports = {mdLinks}

