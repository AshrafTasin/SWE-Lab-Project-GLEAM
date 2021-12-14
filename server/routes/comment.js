import express, { Router } from 'express';
import {createComment,getComments} from "../controllers/comment.js";
const router = express.Router();

router.post('/saveComment',createComment);
router.get('/getComments',getComments);

export default router;