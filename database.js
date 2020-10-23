import * as sqlite from 'sqlite3';

// Create an in-memory database and prepopulate it with first three sample notes
const db = new sqlite.Database(':memory:');

db.serialize(function () {
    db.run('CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT)');
    const stmt = db.prepare('INSERT INTO notes VALUES (?,?)');
    for (var i = 0; i < 3; i++) {
        stmt.run(i, `Sample Note ${i}`);
    }
    stmt.finalize();
});

export async function readNotes() {
    return await new Promise(resolve => {
        db.all('SELECT * FROM notes', (err, result) => resolve(result));
    });
}
