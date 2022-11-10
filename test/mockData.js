const dataMock = {

    pathFile: "prueba.md",

    pathFileAbsolute:"D:\\Desktop\\LABORATORIA\\Project md-links\\BOG005-md-links\\prueba.md",

    pathFileAbsoluteBad: "D:\\Desktop\\LABORATORIA\\Project md-links\\BOG005-md-links\\badDirectory",

    arrayFilesPaths: [
        'D:\\Desktop\\LABORATORIA\\Project md-links\\BOG005-md-links\\prueba.md'
    ],

    validateFalse: [
        {
            href: 'https://www.youtube.com/watch?v=rKK1q7nFt7M&t=323s',
            text: 'Esto es un video',
            file: 'D:\\Desktop\\LABORATORIA\\Project md-links\\BOG005-md-links\\prueba.md'
        },
        {
            href: 'https://nodejs.org/api/fs.html#fspromisesreadfilepath-options',
            text: 'Esto es una pagina',
            file: 'D:\\Desktop\\LABORATORIA\\Project md-links\\BOG005-md-links\\prueba.md'
        },
        {
            href: 'https://www.youtube.com./wat--ch?v=rKK1q7nFt7M&t=323s',
            text: 'Esto es un video(brokenlink)',
            file: 'D:\\Desktop\\LABORATORIA\\Project md-links\\BOG005-md-links\\prueba.md'
        },
        {
            href: 'https://nodejs.--org/api/fs.html#fspromisesreadfilepath-.options',
            text: 'Esto es una pagina(brokenlink)',
            file: 'D:\\Desktop\\LABORATORIA\\Project md-links\\BOG005-md-links\\prueba.md'
        }
    ],

    validateTrue:
        [
            {
                href: 'https://www.youtube.com/watch?v=rKK1q7nFt7M&t=323s',
                text: 'Esto es un video',
                file: 'D:\\Desktop\\LABORATORIA\\Project md-links\\BOG005-md-links\\prueba.md',
                status: 200,
                message: 'Ok'
            },
            {
                href: 'https://nodejs.org/api/fs.html#fspromisesreadfilepath-options',
                text: 'Esto es una pagina',
                file: 'D:\\Desktop\\LABORATORIA\\Project md-links\\BOG005-md-links\\prueba.md',
                status: 200,
                message: 'Ok'
            },
            {
                href: 'https://www.youtube.com./wat--ch?v=rKK1q7nFt7M&t=323s',
                text: 'Esto es un video(brokenlink)',
                file: 'D:\\Desktop\\LABORATORIA\\Project md-links\\BOG005-md-links\\prueba.md',
                status: 404,
                message: 'Fail'
            },
            {
                href: 'https://nodejs.--org/api/fs.html#fspromisesreadfilepath-.options',
                text: 'Esto es una pagina(brokenlink)',
                file: 'D:\\Desktop\\LABORATORIA\\Project md-links\\BOG005-md-links\\prueba.md',
                status: 'Not found FetchError: request to https://nodejs.--org/api/fs.html#fspromisesreadfilepath-.options failed, reason: getaddrinfo ENOTFOUND nodejs.--org',
                message: 'Fail'
            }
        ],
    stats: { Total: 4, Unique: 4 },
    validateandStats: { Total: 4, Unique: 4, Broken: 2 },
}

module.exports = { dataMock };