import UserDb from '../models/userSchema.js'
export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new UserDb({ name, email, password })
        await newUser.save()
        res.status(200).json({"message":"User registered succesfully"})

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal")
    }
    
}