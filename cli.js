const { statsLinks, totalStatsLinks } = require("./index.js");
const { mdLinks } = require("./md-links.js");

const pathFile = process.argv[2]
const args = process.argv

function cli(pathFile, args) {
    if (pathFile && args === undefined) {
        console.log("The path is not valid")
    }
     else if (args.length <= 3) {
        (mdLinks(pathFile, { validate: false }).then((answer) => {
            console.log(answer)
        })).catch(error => {
            console.log("The option is not valid", error)
        })
    } else if (args.includes("--stats") && args.includes("--validate")) {
        (mdLinks(pathFile, { validate:true }).then((answer) => {
            console.log(totalStatsLinks(answer))
        })).catch(error => {
            console.log("The option is not valid", error)
        })
    }
    else if (args.includes("--validate")) {
        (mdLinks(pathFile, { validate: true }).then((answer) => {
            console.log(answer)
        })).catch(error => {
            console.log("The file or directory doesn't exist.", error);
        })
    } else if (args.includes('--stats')) {
        (mdLinks(pathFile, { validate: true }).then((answer) => {
            console.log(statsLinks(answer))
        })).catch(error => {
            console.log("The file or directory doesn't exist.", error);
        })
    } 
  
}
 
cli(pathFile, args)