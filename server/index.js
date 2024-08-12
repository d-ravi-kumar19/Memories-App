import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerOptions.js';

dotenv.config();
const app = express();

// Configure CORS
app.use(cors({ origin: 'http://localhost:3001' }));

// Setup middleware
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Serve Swagger UI at the root route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve static files from 'public' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// // Serve Swagger UI
// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route for serving the homepage
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});

// API routes
app.use("/posts", postRoutes);
app.use('/users', userRoutes);

// Database connection and server startup
console.log("Attempting to connect to MongoDB...");
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 9090;

mongoose.connect(CONNECTION_URL)
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
