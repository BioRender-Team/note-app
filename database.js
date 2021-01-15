import * as sqlite from "sqlite3";

// Create an in-memory database and prepopulate it with first three sample notes
const db = new sqlite.Database(":memory:");

db.serialize(function () {
  db.run(
    "CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT)"
  );
  preseed();
});

function preseed() {
  const stmt = db.prepare("INSERT INTO notes VALUES (?,?)");
  for (var i = 0; i < 3; i++) {
    stmt.run(i, `Sample Note ${i}`);
  }
  stmt.finalize();
}
export function readNotes() {
  return new Promise((r) => {
    db.all("SELECT * FROM notes", (err, result) => {
      return r(result);
    });
  });
}

export async function writeNote(message) {
  return await db.run(`INSERT INTO notes VALUES (null, '${message}')`);
}

export function deleteNote(id) {
  db.run(`DELETE FROM notes WHERE id = '${id}'`);
}

export function resetDB() {
  db.run("DELETE FROM notes");
  preseed();
}
