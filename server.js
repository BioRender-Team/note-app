import express from 'express';
import {deleteNote, readNotes, writeNote, updateNote} from "./database";

const app = express();
app.use(express.json());

// Returns all note objects
// params.text: string
// params.date: 'asc' | 'desc'

app.get('/api/notes', async (req, res, next) => {
    try {
        const notes = await readNotes()
        res.status(200).send(notes)
    } catch (err) {
        res.status(400).send()
    }
});

// Adds the note and sends back a new note object
// req.body.note: string
app.post('/api/note', async (req, res, next) => {
    try {
        const newNote = await writeNote(req.body.note)
        res.status(200).send(newNote)
    } catch (err) {
        res.status(400).send()
    }
});

// Updates the note with id to new value and sends back the new note object
// req.params.id: integer
// req.body.note: string
app.put('/api/note/:id', async (req, res, next) => {
    try {
        const newNote = await updateNote(req.params.id, req.body.note)
        res.status(200).send(newNote)
    } catch (err) {
        res.status(400).send()
    }
});

// Deletes note by id and returns a status code 200 on success
// req.params.id: integer
app.delete('/api/note/:id', async (req, res, next) => {
  try {
      await deleteNote(req.params.id)
      res.status(200).send()
  } catch (err) {
    res.status(400).send()
  }
});

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8080, () => {
  console.log('Running on 8080 ✅');
});
