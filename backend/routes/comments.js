import express from 'express';
import * as commentController from '../controllers/commentController.js';
import { authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/tutorial/:tutorialId', commentController.getComments);
router.post('/', authorize, commentController.createComment);
router.post('/:commentId/like', authorize, commentController.likeComment);

export default router;
