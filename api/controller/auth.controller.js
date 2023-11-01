import UserDb from '../models/userSchema.js'
import bcryptjs from 'bcryptjs'

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