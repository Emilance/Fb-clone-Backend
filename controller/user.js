import { User,  validate } from "../models/user.js"
import bcrypt  from 'bcrypt'
import jwt from "jsonwebtoken";

export const postUser =  async (req, res)=> {
   const userData = req.body;
    console.log(req.body);
   try { 
       const {error} = validate(userData);
       if(error){
         return res.status(400).send({message: error.details[0].message})
       }
    const user =await User.findOne({email: userData.email});
    if(user){
         return res.status(409).send({message: "User with given email already exist"})
    }
    const salt = await bcrypt.genSalt();
    const hashPassword= await bcrypt.hash(userData.password, salt);

   const newUser = await new User({...userData, password : hashPassword}).save();
   const token = newUser.generateAuthToken();

    res.cookie("token", token, {
      httpOnly:true,
    })
    .status(201).json(newUser._id)
   } catch (error) {
       res.status(500).send({message : "internal sever error"})
   }
}

export const  getisLoggedinValue = async (req, res)=> {

  try {
      const token =  req.cookies.token
      if(!token) {
          return res.json(false)
      }
     jwt.verify(token, process.env.JWTPRIVATEKEY)
      res.json(true);
  }catch(error){
      res.json(error);
  }
}

export const getUser= async (req, res) => {
  try {
    if(req.params.id){
      console.log(req.param.id);
      const userInfo=await User.findById(req.params.id);
     res.status(200).json(userInfo);

    }
    else{
      res.status.send("no parameter specify")
      console.log("no parameter specify")
    }
  } catch (error) {
    res.status(404).json({message :error.message})
  }
}