const { readJsonFile, appendJsonFile, writeJsonFile } = require("../helpers/fsUtils");
const path = require("path");
const nts = require('express').Router();
const { v4: uuidv4 } = require('uuid');
// const { readAndAppend, readFromFile } = require('../helpers');
const notesJsonPath = path.join(__dirname, "../db/db.json");

nts.get('/', (req, res) => {
  // readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
  console.info(`${req.method} request received for notes`);

  readJsonFile(notesJsonPath).then(data =>
    
    res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json("There was an unexpected server error.");
    });
  });

nts.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;
  const newNote = {
    id: uuidv4(),
    title,
    text
  };
  
  let validationError = "";

  if(newNote.title.length === 0 || newNote.title.length > 50) {
    validationError = "Title must have 1 to 50 characters."
  }
  
  if(newNote.text.length === 0 || newNote.text.length > 50) {
    validationError = "Text must have 1 to 50 characters."
  }

  if (validationError) {
    return res.status(400).json(validationError);
  }

  appendJsonFile(notesJsonPath, newNote).then(() => {
    res.json(newNote);
  }).catch((err) => {
    console.log(err);
    res.status(500).json("There was an unexpected server error.");
  });
});

nts.delete('/:id', (req, res) => {
  readJsonFile(notesJsonPath)
    .then((notes) => {
      const updateNotes = notes.filter((note) => note.id !== req.params.id);
      return writeJsonFile(notesJsonPath, updateNotes);
    })
    .then(() => {
      res.json("Deleted note");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("There was an unexpected server error.");
    });
})


module.exports = nts;