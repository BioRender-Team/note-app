import React, { useState, useEffect } from "react";
import { NotesComponent } from "./notes";

export const App = () => {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");

  const findNotes = async () => {
    return await fetch("/api/notes").then((r) => r.json());
  };

  const deleteNote = async (id) => {
    return await fetch(`/api/note/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    (async () => {
      setNotes(await findNotes());
    })();
  }, []);

  const addNote = async (note) => {
    if (notes.length >= 10) {
      setMessage("Can't have more than 10 notes.");
      return;
    }
    await fetch("/api/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: note }),
    });
  };

  return (
    <NotesComponent
      message={message}
      notes={notes}
      onAdd={async (value) => {
        if (value) {
          setMessage("");
          await addNote(value);
          setNotes(await findNotes());
        } else {
          setMessage("Note can't be empty.");
        }
      }}
      onRemove={async (id) => {
        await deleteNote(id);
        setNotes(await findNotes());
      }}
    />
  );
};
