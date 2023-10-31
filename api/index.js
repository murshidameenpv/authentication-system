import express from 'express';
import dotenv from 'dotenv';
import './db/mongodb.js';
import userRouter  from './routes/user.route.js'
    
dotenv.config()
const app = express()

const port = process.env.PORT || 8001;

app.use('/',userRouter)

    app.listen(port, () => {
        console.log(`Server Listening on port http://localhost:${port}`);
    })  