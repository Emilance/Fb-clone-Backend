import express from 'express';
import { createPost, deletePost, getPost } from '../controller/post.js';
import post from '../models/post.js';
import multer from "multer"

const router = express.Router()



const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, "../client/public/uploads/");
    },
    filename: (req,  file, callback ) => {
        console.log(file)
        callback(null, file.originalname)
    }
})

const upload = multer({storage :storage})


router.get('/', getPost)
router.post('/', upload.single("postImage"), createPost)
router.delete('/:id', deletePost)

export default router