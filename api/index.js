    import express from 'express';
    import dotenv from 'dotenv'
    import './db/mongodb.js';

    dotenv.config()
    const app = express()

    const port = process.env.PORT || 8001;

    app.listen(3000, () => {
        console.log(`Server Listening on port http://localhost:${port}`);
    })