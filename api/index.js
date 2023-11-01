import express from 'express';
import dotenv from 'dotenv';
import './db/mongodb.js';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
    
dotenv.config()
const app = express()
const port = process.env.PORT || 8001;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/', userRouter)
app.use('/api/auth',authRouter)



app.listen(port, () => {
        console.log(`Server Listening on port http://localhost:${port}`);
    })  