const { absolutePath, getFiles, readFiles, validateLinks } = require("./index.js");
const pathFile = 'goodDirectory';


const mdLinks = (pathFile, options = { validate: true }) => {
  return new Promise((resolve, reject) => {
    const callAbsolutePath = absolutePath(pathFile)
    const callGetFiles = getFiles(callAbsolutePath)
    readFiles(callGetFiles).then((callReadFiles) => {
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



mdLinks(pathFile).then((result) => {
  console.log("aqui es mdlinks", result)
})


