import express, { Router } from 'express';
import { removeLike,likeBlog, getBlogs, createBlogs, getSingleBlog, blogImage, getBlogImage, deleteBlog, updateBlog, getUserBlog } from '../controllers/blogs.js';
import ckimage from '../middleware/ckimage.js';

const router = express.Router();

router.post('/createBlog',createBlogs);
router.get('/getBlog',getBlogs);
router.post('/upload',ckimage,blogImage);

router.get('/images/:id',getBlogImage);
router.delete('/:id',deleteBlog);
router.put('/:id',updateBlog);
router.get('/:id',getSingleBlog);
router.get('/user/:id',getUserBlog);
router.patch('/:id/likeBlog',likeBlog);
router.patch('/:id/removeLike',removeLike);

export default router;