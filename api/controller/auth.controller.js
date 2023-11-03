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

export const googleSignIn = async (req, res, next) => {
    try {
        let user = await userDb.findOne({ email: req.body.email });

        if (!user) {
            // If the user doesn't exist, create a new one
            const generatePassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
            user = new userDb({
                name: req.body.name.split(" ").join("").toLowerCase() + (Math.floor(Math.random() * 10000)).toString(),
                password: hashedPassword,
                email: req.body.email,
                profileImage: req.body.image,
            });
            await user.save();
        }

        // Create JWT, remove password from user object, set cookie and send response
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const userToSend = user.toObject();
        delete userToSend.password;
        const expiryDate = new Date(Date.now() + 3600000);
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(userToSend);
    } catch (error) {
        console.log(error);
    }
};


export const signOut = async (req, res) => {
    res.clearCookie('access_token').status(200).json({"message":"Signed Out successfully"})
    
} 