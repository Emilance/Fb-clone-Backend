import express from 'express'
import {  postUser } from '../controller/user.js';

const router = express.Router();



router.post("/", postUser)

export default router