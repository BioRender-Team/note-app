import express from 'express';
import {readNotes} from "./database";

const app = express();
app.use(express.json());

// Returns all note objects
app.get('/api/notes', async (req, res, next) => {
    const notes = await readNotes()
    res.status(200).send(notes)
});

// Adds the note and sends back a new note object
// req.body.note: string
app.post('/api/note', async (req, res, next) => {
    // todo: write to db
    res.status(200).send({id: Math.random()*100, value: req.body.note})
});

// Deletes note by id and returns a status code 200 on success
// req.body.note: string
app.delete('/api/note', async (req, res, next) => {
    // todo: delete the note
    res.status(200).send()
});

app.use('*', express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8080);
