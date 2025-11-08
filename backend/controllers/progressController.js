import Progress from '../models/Progress.js';
import Tutorial from '../models/Tutorial.js';

export const getCourseProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      user: req.userId,
      course: req.params.courseId
    }).populate('completedTutorials.tutorial');

    res.json({
      success: true,
      progress: progress || null
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const completeTutorial = async (req, res) => {
  try {
    const tutorialId = req.params.tutorialId;
    const tutorial = await Tutorial.findById(tutorialId);
    
    if (!tutorial) {
      return res.status(404).json({
        success: false,
        message: 'Tutorial not found'
      });
    }

    let progress = await Progress.findOne({
      user: req.userId,
      course: tutorial.course
    });

    if (!progress) {
      progress = await Progress.create({
        user: req.userId,
        course: tutorial.course,
        completedTutorials: [{ tutorial: tutorialId }],
        currentTutorial: tutorialId
      });
    } else {
      // Check if already completed
      const alreadyCompleted = progress.completedTutorials.some(
        ct => ct.tutorial.toString() === tutorialId
      );

      if (!alreadyCompleted) {
        progress.completedTutorials.push({ tutorial: tutorialId });
      }

      progress.currentTutorial = tutorialId;
    }

    // Calculate progress percentage
    const totalTutorials = await Tutorial.countDocuments({ 
      course: tutorial.course,
      isPublished: true 
    });
    
    progress.progressPercentage = Math.round(
      (progress.completedTutorials.length / totalTutorials) * 100
    );

    await progress.save();
    await progress.populate('completedTutorials.tutorial');

    res.json({
      success: true,
      progress
    });
  } catch (error) {
    console.error('Complete tutorial error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const updateCurrentTutorial = async (req, res) => {
  try {
    const tutorialId = req.params.tutorialId;
    const tutorial = await Tutorial.findById(tutorialId);
    
    if (!tutorial) {
      return res.status(404).json({
        success: false,
        message: 'Tutorial not found'
      });
    }

    let progress = await Progress.findOne({
      user: req.userId,
      course: tutorial.course
    });

    if (!progress) {
      progress = await Progress.create({
        user: req.userId,
        course: tutorial.course,
        currentTutorial: tutorialId
      });
    } else {
      progress.currentTutorial = tutorialId;
      await progress.save();
    }

    res.json({
      success: true,
      progress
    });
  } catch (error) {
    console.error('Update current tutorial error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};