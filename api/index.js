import { log } from 'console';
import express from 'express';
const app = express()



app.listen(3000, () => {
    console.log(`Server Listening on port http://localhost:3000`);
})