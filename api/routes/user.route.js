import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { updateUser,deleteUser } from '../controller/user.controller.js';
const router = express.Router()


router.post('/update/:id',verifyToken,updateUser )
router.delete('/delete/:id',verifyToken,deleteUser )

export default router;  