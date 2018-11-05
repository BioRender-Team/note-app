import * as sqlite from 'sqlite3';

const db = new sqlite.Database(':memory:');

db.serialize(function () {
  db.run('CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT)');
  const stmt = db.prepare('INSERT INTO notes VALUES (?,?)');
  for (var i = 0; i < 3; i++) {
    stmt.run(i, `Sample Note ${i}`);
  }
  stmt.finalize();
});

export function readNotes() {
  return new Promise(r => {
    db.all('SELECT * FROM notes', (err, result) => r(result));
  });
}

export function writeNote(message) {
  db.run(`INSERT INTO notes VALUES (null, '${message}')`);
}


export function deleteNote(message) {
  db.run(`DELETE FROM notes WHERE value = '${message}'`);
}

