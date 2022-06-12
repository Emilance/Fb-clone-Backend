import express from 'express'
import {  getisLoggedinValue, getUser, postUser } from '../controller/user.js';
import jwt from "jsonwebtoken";

const router = express.Router();


router.post("/", postUser)

router.get("/loggedIn", getisLoggedinValue)
router.get("/userInfo/",  getUser)

export default router