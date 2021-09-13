const express = require('express');
const path = require('path');
const app = express();
var PORT = process.env.PORT || 3001;
const fs = require('fs')

app.use(express.json())
app.use(express.static('public'))
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// get request for notes
app.get('/api/notes', (req, res) => {
  console.info(`GET /api/notes`);
  let notes = fs.readFileSync('./db/db.json')
  let notesJson = JSON.parse(notes)
  res.status(200).json(notesJson);
});
// POST request to add a note
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);
  let newNote = req.body
  let notes = fs.readFileSync('./db/db.json')
  let notesJson = JSON.parse(notes)
  notesJson.push(
    newNote
  )
  let noteString = JSON.stringify(notesJson)
  fs.writeFile('./db/db.json', noteString, (err) => {
    if (err) {
      console.log(err);
      res.json('ERR')
    }
    else {
      console.log('note added successfully')
      res.json('SUCCESS')
    }
  });
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
