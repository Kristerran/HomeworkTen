const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;
const fs = require('fs')
const notes = require('./db/db.json')

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
  res.status(200).json(notes);
});
// POST request to add a note
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);
  let newNote = req.body
  notes.push(
    newNote
  )
  let noteString = JSON.stringify(notes)
  fs.writeFile('./db/db.json', noteString, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log('note added successfully')
    }
  });
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
