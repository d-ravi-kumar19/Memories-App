//server/index.js

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import dotenv from 'dotenv';
import path from 'path'
import { fileURLToPath } from 'url'
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js'
import notFound from './middleware/notFound.js'

dotenv.config();
const app = express();
app.use(logger)

// setup static folder
const __filename = fileURLToPath(import.meta.url)
// console.log(__filename)
const __dirname = path.dirname(__filename)
app.get('/',(req, res) =>
    res.status(200).sendFile(path.join(__dirname, 'index.html'))
)

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/posts", postRoutes);
app.use(notFound)
app.use(errorHandler)

const CONNECTION_URL =  process.env.CONNECTION_URL;
const PORT = process.env.PORT || 9090;

console.log('Attempting to connect to MongoDB...')

mongoose.connect(CONNECTION_URL,{connectTimeoutMS: 10000})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}...`);
        });
    })
    .catch((error) => {
        console.error('Connection error', error.message);
        process.exit(1);
    });


