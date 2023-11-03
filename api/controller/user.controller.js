import bcrypt from 'bcryptjs'
import userDb from '../models/userSchema.js'

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return res.status(401).json({"message":"You can update your account only"})
    }
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password,10)
        }
        const updatedUser = await userDb.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                profileImage: req.body.profileImage,
            }
        }, { new: true }
        );
                 // Exclude password when sending user data
        const userToSend = updatedUser.toObject();
        delete userToSend.password;

        res.status(200).json(userToSend)
    
    } catch (err) {
        console.log(err);
}
    
}