const { readFile, writeFile } = require("fs").promises;

const readJsonFile = (filePath) => {
  return readFile(filePath, "utf-8").then((data) => JSON.parse(data));
};

const writeJsonFile = (filePath, data) => 
  writeFile(filePath, JSON.stringify(data));

const appendJsonFile = (filePath, newData) => {
  return readJsonFile(filePath).then((data) => {
    data.push(newData);
    return writeJsonFile(filePath, data);
  });
};


module.exports = { readJsonFile, appendJsonFile, writeJsonFile };





// const fs = require('fs');
// const util = require('util');

// // Promise version of fs.readFile
// const readJsonFile = util.promisify(fs.readFile);
// /**
//  *  Function to write data to the JSON file given a destination and some content
//  *  @param {string} destination The file you want to write to.
//  *  @param {object} content The content you want to write to the file.
//  *  @returns {void} Nothing
//  */
// const writeJsonFile = (destination, content) =>
//   fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
//     err ? console.error(err) : console.info(`\nData written to ${destination}`)
//   );
// /**
//  *  Function to read data from a given a file and append some content
//  *  @param {object} content The content you want to append to the file.
//  *  @param {string} file The path to the file you want to save to.
//  *  @returns {void} Nothing
//  */
// const appendJsonFile = (content, file) => {
//   fs.readFile(file, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//     } else {
//       const parsedData = JSON.parse(data);
//       parsedData.push(content);
//       writeJsonFile(file, parsedData);
//     }
//   });
// };

// module.exports = { readJsonFile, writeJsonFile, appendJsonFile };
