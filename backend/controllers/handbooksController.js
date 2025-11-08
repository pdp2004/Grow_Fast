import Handbooks from "../data/notes.js";

// ✅ Get all handbooks
export const getAllHandbooks = (req, res) => {
  res.json(Handbooks);
};

// ✅ Get handbook by ID
export const getHandbookById = (req, res) => {
  const handbook = Handbooks.find((h) => h.id === parseInt(req.params.id));

  if (!handbook) {
    return res.status(404).json({ message: "Handbook not found" });
  }

  res.json(handbook);
};

// ✅ Get handbooks by title
export const getHandbooksByTitle = (req, res) => {
  const titleQuery = req.params.title.toLowerCase();
  const matched = Handbooks.filter((h) =>
    h.title.toLowerCase().includes(titleQuery)
  );

  if (matched.length === 0) {
    return res.status(404).json({ message: "No handbooks found with this title" });
  }

  res.json(matched);
};

// ✅ Add a new handbook (POST)
export const addHandbook = (req, res) => {
  const { title, description, fileUrl, fileName } = req.body;

  if (!title || !description || !fileUrl || !fileName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newHandbook = {
    id: Handbooks.length ? Handbooks[Handbooks.length - 1].id + 1 : 1,
    title,
    description,
    buttonText: "Download",
    fileUrl,
    fileName,
  };

  Handbooks.push(newHandbook);

  res.status(201).json({
    message: "Handbook added successfully",
    handbook: newHandbook,
  });
};

// ✅ Update handbook (PUT)
export const updateHandbook = (req, res) => {
  const handbookId = parseInt(req.params.id);
  const { title, description, fileUrl, fileName } = req.body;

  const index = Handbooks.findIndex((h) => h.id === handbookId);
  if (index === -1) {
    return res.status(404).json({ message: "Handbook not found" });
  }

  const updatedHandbook = {
    ...Handbooks[index],
    title: title || Handbooks[index].title,
    description: description || Handbooks[index].description,
    fileUrl: fileUrl || Handbooks[index].fileUrl,
    fileName: fileName || Handbooks[index].fileName,
  };

  Handbooks[index] = updatedHandbook;

  res.json({
    message: "Handbook updated successfully",
    handbook: updatedHandbook,
  });
};

// ✅ Delete handbook (DELETE)
export const deleteHandbook = (req, res) => {
  const handbookId = parseInt(req.params.id);
  const index = Handbooks.findIndex((h) => h.id === handbookId);

  if (index === -1) {
    return res.status(404).json({ message: "Handbook not found" });
  }

  const deleted = Handbooks.splice(index, 1);

  res.json({
    message: "Handbook deleted successfully",
    handbook: deleted[0],
  });
};
