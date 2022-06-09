import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import Joi from "joi";
import passwordComplexity from "joi-password-complexity"

const complexityOptions ={
    min :2,
    max:30
}

const userSchema = mongoose.Schema({
    firstName: {
        type:String,
        require: true
    },
    surName: {
        type:String,
        require: true
    },
    email: {
        type:String,
        require: true
    },
    password: {
        type:String,
        require: true
    }
    // dayOfBirth: Number,
    // monthOfBirth:String,
    // yearOBirth:Number,
    // gender:String

});


userSchema.methods.generateAuthToken = function(){
    const token =jwt.sign({_id:this._id}, process.env.JWTPRIVATEKEY);
    console.log(token)
    return token
}

export const User = mongoose.model("user", userSchema);

export const validate = (data) => {
    const schema = Joi.object({
        firstName:  Joi.string().required().label("FirstName"),
        surName:  Joi.string().required().label("SurName"),
        email:  Joi.string().email().required().label("email"),
        password: passwordComplexity(complexityOptions).required().label("Password")


    })

    return schema.validate(data)
}

