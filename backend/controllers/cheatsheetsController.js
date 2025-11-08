import Cheatsheets from "../data/notes.js";

// ✅ Get all cheatsheets
export const getAllCheatsheets = (req, res) => {
  res.json(Cheatsheets);
};

// ✅ Get cheatsheet by ID
export const getCheatsheetById = (req, res) => {
  const cheatsheet = Cheatsheets.find((c) => c.id === parseInt(req.params.id));

  if (!cheatsheet) {
    return res.status(404).json({ message: "Cheatsheet not found" });
  }

  res.json(cheatsheet);
};

// ✅ Get cheatsheets by title (search)
export const getCheatsheetsByTitle = (req, res) => {
  const titleQuery = req.params.title.toLowerCase();
  const matched = Cheatsheets.filter((c) =>
    c.title?.toLowerCase().includes(titleQuery)
  );

  if (matched.length === 0) {
    return res.status(404).json({ message: "No cheatsheets found with this title" });
  }

  res.json(matched);
};

// ✅ Add a new cheatsheet (POST)
export const addCheatsheet = (req, res) => {
  const { title, description, fileUrl, fileName } = req.body;

  if (!title || !description || !fileUrl || !fileName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newCheatsheet = {
    id: Cheatsheets.length ? Cheatsheets[Cheatsheets.length - 1].id + 1 : 1,
    title,
    description,
    buttonText: "Download",
    fileUrl,
    fileName,
  };

  Cheatsheets.push(newCheatsheet);

  res.status(201).json({
    message: "Cheatsheet added successfully",
    cheatsheet: newCheatsheet,
  });
};

// ✅ Update an existing cheatsheet (PUT)
export const updateCheatsheet = (req, res) => {
  const cheatsheetId = parseInt(req.params.id);
  const { title, description, fileUrl, fileName } = req.body;

  const index = Cheatsheets.findIndex((c) => c.id === cheatsheetId);
  if (index === -1) {
    return res.status(404).json({ message: "Cheatsheet not found" });
  }

  const updatedCheatsheet = {
    ...Cheatsheets[index],
    title: title || Cheatsheets[index].title,
    description: description || Cheatsheets[index].description,
    fileUrl: fileUrl || Cheatsheets[index].fileUrl,
    fileName: fileName || Cheatsheets[index].fileName,
  };

  Cheatsheets[index] = updatedCheatsheet;

  res.json({
    message: "Cheatsheet updated successfully",
    cheatsheet: updatedCheatsheet,
  });
};

// ✅ Delete a cheatsheet (DELETE)
export const deleteCheatsheet = (req, res) => {
  const cheatsheetId = parseInt(req.params.id);
  const index = Cheatsheets.findIndex((c) => c.id === cheatsheetId);

  if (index === -1) {
    return res.status(404).json({ message: "Cheatsheet not found" });
  }

  const deleted = Cheatsheets.splice(index, 1);

  res.json({
    message: "Cheatsheet deleted successfully",
    cheatsheet: deleted[0],
  });
};
