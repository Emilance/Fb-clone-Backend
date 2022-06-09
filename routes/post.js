import express from 'express';
import { createPost, deletePost, getPost } from '../controller/post.js';
import post from '../models/post.js';

const router = express.Router()

router.get('/', getPost)
router.post('/', createPost)
router.delete('/:id', deletePost)

export default router