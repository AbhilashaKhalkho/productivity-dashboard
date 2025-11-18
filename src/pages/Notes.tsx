import { useState, useEffect } from "react";

interface Note {
  id: number;
  content: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState<string>("");

  // Load saved notes from localStorage on start
  useEffect(() => {
    try {
      const raw = localStorage.getItem("notes");
      if (raw) {
        setNotes(JSON.parse(raw));
      }
    } catch {
      setNotes([]);
    }
  }, [])

  // Save notes whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);


  const addNote = () => {
    if (text.trim() === "") return;
    const newNote: Note = {
      id: Date.now(),
      content: text,
    };
    setNotes([newNote, ...notes]);
    setText("");
  };

   const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-emerald-200 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold text-emerald-700 mb-8">Notes App</h1>

      <div className="w-[28rem] bg-white p-6 rounded-2xl shadow-lg">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a new note..."
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring focus:ring-emerald-200"
          rows={4}
        />
        <button
          onClick={addNote}
          className="w-full py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition"
        >
          Add Note
        </button>
      </div>

      <div className="mt-8 w-[28rem] space-y-4">
        {notes.length === 0 && (
          <p className="text-gray-600 text-center">No notes yet. Add one above!</p>
        )}
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white p-4 rounded-xl shadow-md flex justify-between items-start"
          >
            <p className="text-gray-800 whitespace-pre-wrap">{note.content}</p>
            <button
              onClick={() => deleteNote(note.id)}
              className="text-red-500 font-semibold hover:text-red-700 ml-4"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
