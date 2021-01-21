const express = require("express");
const bodyParser = require("body-parser");
const { deleteNote, readNotes, writeNote, updateNote } = require("./database");

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Returns all note objects
app.get("/api/notes", async (req, res, next) => {
  try {
    const notes = await readNotes();
    res.status(200).send(notes);
  } catch (err) {
    res.status(400).send();
  }
});

// Adds the note and sends back a new note object
// req.body.note: string
app.post("/api/note", async (req, res, next) => {
  try {
    const newNote = await writeNote(req.body.note);
    res.status(200).send(newNote);
  } catch (err) {
    res.status(400).send();
  }
});

// Updates the note with id to new value and sends back the new note object
// req.params.id: integer
// req.body.note: string
app.put("/api/note/:id", async (req, res, next) => {
  try {
    const newNote = await updateNote(req.params.id, req.body.note);
    res.status(200).send(newNote);
  } catch (err) {
    res.status(400).send();
  }
});

// Deletes note by id and returns a status code 200 on success
// req.params.id: integer
app.delete("/api/note/:id", async (req, res, next) => {
  try {
    await deleteNote(req.params.id);
    res.status(200).send();
  } catch (err) {
    res.status(400).send();
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
