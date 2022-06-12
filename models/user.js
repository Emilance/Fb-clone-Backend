import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity"

const complexityOptions ={
    min :3,
    max:30
}

const userSchema = mongoose.Schema({
    dayOfBirth: Number,
    monthOfBirth:String,
    yearOfBirth:Number,
    gender:String,
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
        password: passwordComplexity(complexityOptions).required().label("Password"),
        dayOfBirth: Joi.number().label("day of Birth"),
        monthOfBirth:Joi.string().label("month of birth"),
        yearOfBirth: Joi.number().label("year of Birth"),
        gender:Joi.string().label("gender"),

    })

    return schema.validate(data)
}

