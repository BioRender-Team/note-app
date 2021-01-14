import express from "express";
import { deleteNote, readNotes, resetDB, writeNote } from "./database";

const app = express();
app.use(express.json());

app.get("/api/notes", async (req, res, next) => {
  res.send(await readNotes());
});

app.post("/api/note", async (req, res, next) => {
  res.send(await writeNote(req.body.note));
});

app.delete("/api/note", async (req, res, next) => {
  console.log(req.body.note);
  res.send(await deleteNote(req.body.note));
});

app.delete("/api/notes", async (req, res, next) => {
  console.log(req.body.note);
  res.send(await resetDB());
});

app.use("*", express.static(__dirname + "/public"));

app.listen(process.env.PORT || 8080);
