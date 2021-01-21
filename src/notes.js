import React from "react";
export const NotesComponent = ({ onAdd, onRemove, notes, message }) => (
  <div>
    <h1>Notes</h1>
    <ul>
      {notes.map((n) => (
        <li key={n.id}>
          {n.value}
          <button
            onClick={(e) => {
              onRemove(n.id);
            }}
          >
            X
          </button>
        </li>
      ))}
    </ul>
    <input type="text" id="newNote" />
    <button
      onClick={() => {
        onAdd(document.getElementById("newNote").value);
        document.getElementById("newNote").value = "";
      }}
    >
      Add note
    </button>
    <div>{message}</div>
  </div>
);
