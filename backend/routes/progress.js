import express from 'express';
import * as progressController from '../controllers/progressController.js';
import { authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/course/:courseId', authorize, progressController.getCourseProgress);
router.post('/complete-tutorial/:tutorialId', authorize, progressController.completeTutorial);
router.put('/current-tutorial/:tutorialId', authorize, progressController.updateCurrentTutorial);

export default router;
