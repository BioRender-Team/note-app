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

const insertNote = async () => {
    return await new Promise(resolve => {
        db.run(`INSERT INTO notes VALUES (null, '${message}')`, function () {
            db.all(`SELECT * FROM notes WHERE id = ${this.lastID}`, (err, result) => {
                if (result && result.length === 1) {
                    resolve(result[0])
                }
            });
        });
    });
}

export async function writeNote(message) {
    return await new Promise(resolve => {
        db.run(`INSERT INTO notes VALUES (null, '${message}')`, function () {
            db.all(`SELECT * FROM notes WHERE id = ${this.lastID}`, (err, result) => {
                if (result && result.length === 1) {
                    resolve(result[0])
                }
            });
        });
    });
}

export async function updateNote(id, message) {
    return await new Promise(resolve => {
        db.run(`UPDATE notes SET value = '${message}' WHERE id = ${id}`, function () {
            db.all(`SELECT * FROM notes WHERE id = ${id}`, (err, result) => {
                if (result && result.length === 1) {
                    resolve(result[0])
                }
            });
        });
    });}

export async function deleteNote(id) {
    return await new Promise(resolve => {
        db.run(`DELETE FROM notes WHERE id = '${id}'`, (err, result) => {
            if (err) {
                reject();
            }
            resolve()
        });
    });

}

