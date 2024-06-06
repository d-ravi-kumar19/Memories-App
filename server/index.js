//server/index.js

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
// import logger from "./middleware/logger.js";
// import errorHandler from "./middleware/error.js";
// import notFound from "./middleware/notFound.js";

dotenv.config();
const app = express();



// app.use(logger);

// setup static folder
const __filename = fileURLToPath(import.meta.url);
// console.log(__filename)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure CORS

const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname,'public')))
app.get("/", (req, res) =>
  res.status(200).sendFile(path.join(__dirname, "index.html"))
);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
// app.use(notFound);
// app.use(errorHandler);

console.log("Attempting to connect to MongoDB...");
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 9090;

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}...`);
    });
  })
  .catch((error) => {
    console.error("Connection error", error.message);
    process.exit(1);
  });

  // mongoose.set('useFindAndModify', false);