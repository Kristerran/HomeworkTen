const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static('public'))
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then(data => JSON.parse(data))
});

// app.post('/notes', (req, res) =>
  
// );

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
