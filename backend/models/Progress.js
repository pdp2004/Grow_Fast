import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  completedTutorials: [{
    tutorial: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutorial'
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  currentTutorial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutorial'
  },
  progressPercentage: {
    type: Number,
    default: 0
  },
  totalTimeSpent: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate progress percentage before saving
progressSchema.pre('save', function(next) {
  if (this.completedTutorials && this.course) {
    // This will be populated in the controller
    next();
  } else {
    next();
  }
});

export default mongoose.model('Progress', progressSchema);
