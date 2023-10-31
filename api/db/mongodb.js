import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config()


const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})//returns a promise
    .then(() => {
        console.log("Mongo DB Connected");
    })
    .catch((error) => {
        console.log(error);
    })