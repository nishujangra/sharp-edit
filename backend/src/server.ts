import express from 'express';
import path, { join } from 'path';
import cors from 'cors';
import serveStatic from 'serve-static';

import imageRoutes from './routes/imageRoutes';
import manipulationRoutes from './routes/manipulationRoutes';

const app = express();
const port = 5000;


// CORS Middleware
app.use(cors()); // This will allow requests from all origins by default


// Middleware to serve static files from the uploads folder
app.use('/uploads', serveStatic(path.join(__dirname, '../uploads')));


// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api', imageRoutes);
app.use('/api', manipulationRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});