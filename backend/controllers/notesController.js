import Notes from "../data/notes.js";

// ✅ Get all notes
export const getAllNotes = (req, res) => {
  res.json(Notes);
};

// ✅ Get note by ID
export const getNoteById = (req, res) => {
  const note = Notes.find((n) => n.id === parseInt(req.params.id));

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
};

// ✅ Get notes by category
export const getNotesByCategory = (req, res) => {
  const categoryNotes = Notes.filter(
    (n) => n.category.toLowerCase() === req.params.category.toLowerCase()
  );

  if (categoryNotes.length === 0) {
    return res.status(404).json({ message: "No notes found in this category" });
  }

  res.json(categoryNotes);
};

// ✅ Add a new note (POST)
export const addNote = (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newNote = {
    id: Notes.length ? Notes[Notes.length - 1].id + 1 : 1,
    title,
    content,
    category,
  };

  Notes.push(newNote);

  res.status(201).json({
    message: "Note added successfully",
    note: newNote,
  });
};

// ✅ Update an existing note (PUT)
export const updateNote = (req, res) => {
  const noteId = parseInt(req.params.id);
  const { title, content, category } = req.body;

  const noteIndex = Notes.findIndex((n) => n.id === noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  const updatedNote = {
    ...Notes[noteIndex],
    title: title || Notes[noteIndex].title,
    content: content || Notes[noteIndex].content,
    category: category || Notes[noteIndex].category,
  };

  Notes[noteIndex] = updatedNote;

  res.json({
    message: "Note updated successfully",
    note: updatedNote,
  });
};

// ✅ Delete a note (DELETE)
export const deleteNote = (req, res) => {
  const noteId = parseInt(req.params.id);
  const index = Notes.findIndex((n) => n.id === noteId);

  if (index === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  const deletedNote = Notes.splice(index, 1);

  res.json({
    message: "Note deleted successfully",
    note: deletedNote[0],
  });
};
