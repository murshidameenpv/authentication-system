import userDb from '../models/userSchema.js';
import UserDb from '../models/userSchema.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

export const signUp = async (req, res,next) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10)
    try { 
        const newUser = new UserDb({ name, email, password:hashedPassword })
        await newUser.save()
        res.status(200).json({"message":"User registered successfully"})

    } catch (error) {
        console.log(error);
        next(error)
    }
    
}

export const signIn = async (req, res,next) => {
    const { email, password, } = req.body;
    try {
        const validUser = await userDb.findOne({ email })
        if (!validUser) {
            return res.status(404).json({"message":"User not found!"})
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return res.status(401).json({"message":"Invalid Credentials!"})
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
         // Exclude password when sending user data
        const userToSend = validUser.toObject();
        delete userToSend.password;
        const expiryDate = new Date(Date.now()+3600000)
        res.cookie('access_token', token, { httpOnly: true, expires:expiryDate})
            .status(200)
            .json(userToSend)
        
    } catch (err) {
        console.log(err);
        next(err)
    }
}