import Tutorial from "../data/tutorials.js";

// ✅ Get all tutorials
export const getAllTutorials = (req, res) => {
  res.json(Tutorial);
};

// ✅ Get tutorial by ID
export const getTutorialById = (req, res) => {
  const tutorial = Tutorial.find((t) => t.id === parseInt(req.params.id));

  if (!tutorial) {
    return res.status(404).json({ message: "Tutorial not found" });
  }

  res.json(tutorial);
};

// ✅ Get tutorials by category
export const getTutorialsByCategory = (req, res) => {
  const categoryTutorials = Tutorial.filter(
    (t) => t.category.toLowerCase() === req.params.category.toLowerCase()
  );

  if (categoryTutorials.length === 0) {
    return res.status(404).json({ message: "No tutorials found in this category" });
  }

  res.json(categoryTutorials);
};

// ✅ Add a new tutorial (POST)
export const addTutorial = (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newTutorial = {
    id: Tutorial.length ? Tutorial[Tutorial.length - 1].id + 1 : 1,
    title,
    description,
    category,
  };

  Tutorial.push(newTutorial);

  res.status(201).json({
    message: "Tutorial added successfully",
    tutorial: newTutorial,
  });
};

// ✅ Update an existing tutorial (PUT)
export const updateTutorial = (req, res) => {
  const tutorialId = parseInt(req.params.id);
  const { title, description, category } = req.body;

  const tutorialIndex = Tutorial.findIndex((t) => t.id === tutorialId);

  if (tutorialIndex === -1) {
    return res.status(404).json({ message: "Tutorial not found" });
  }

  const updatedTutorial = {
    ...Tutorial[tutorialIndex],
    title: title || Tutorial[tutorialIndex].title,
    description: description || Tutorial[tutorialIndex].description,
    category: category || Tutorial[tutorialIndex].category,
  };

  Tutorial[tutorialIndex] = updatedTutorial;

  res.json({
    message: "Tutorial updated successfully",
    tutorial: updatedTutorial,
  });
};

// ✅ Delete a tutorial (DELETE)
export const deleteTutorial = (req, res) => {
  const tutorialId = parseInt(req.params.id);
  const index = Tutorial.findIndex((t) => t.id === tutorialId);

  if (index === -1) {
    return res.status(404).json({ message: "Tutorial not found" });
  }

  const deletedTutorial = Tutorial.splice(index, 1);

  res.json({
    message: "Tutorial deleted successfully",
    tutorial: deletedTutorial[0],
  });
};
