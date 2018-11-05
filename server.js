import express from 'express';
import {deleteNote, readNotes, writeNote} from "./database";

const app = express();
app.use(express.json());

app.get('/api/notes', async (req, res, next) => {
  res.send(await readNotes());
});

app.post('/api/note', async (req, res, next) => {
  res.send(await writeNote(req.body.note));
});

app.delete('/api/note', async (req, res, next) => {
  res.send(await deleteNote(req.body.note));
});

app.use('*', express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8080);