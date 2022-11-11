const { absolutePath, getFiles, statsLinks, totalStatsLinks } = require('../index.js');
const { mdLinks } = require('../md-links.js');
const { dataMock } = require('./mockData.js');

describe('absolute Path', () => {
  it("should return a absolute path", () => {
    expect(absolutePath(dataMock.pathFile)).toBe(dataMock.pathFileAbsolute)
   });
});

describe('get Files', () => {
  it("should return an array of paths", () => {
    expect(getFiles(dataMock.pathFileAbsolute)).toEqual(dataMock.arrayFilesPaths)
   });
   it ("should return [] ", () => {
    expect(getFiles(dataMock.pathFileAbsoluteBad)).toEqual([])
   } )
});

describe('mdLinks', () => {
  it('should be a function', () => {
    expect(typeof mdLinks).toBe("function")
  });

it ("should return validate false", () => {
  return mdLinks(dataMock.pathFileAbsolute, { validate: false}).then(data => {
    expect(data).toEqual(dataMock.validateFalse)
  })
});
 
it ("should return validate true", () => {
  return mdLinks(dataMock.pathFileAbsolute, { validate: true}).then(data => {
    expect(data).toEqual(dataMock.validateTrue)
  })
});
});

describe('--stats and --validate', () => {
  it("should return --stats", () => {
    expect(statsLinks(dataMock.validateTrue)).toEqual(dataMock.stats)
   });

   it("should return --stats --validate", () => {
    expect(totalStatsLinks(dataMock.validateTrue)).toEqual(dataMock.validateandStats)
   });
});