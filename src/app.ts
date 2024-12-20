import express from 'express';
import dotenv from 'dotenv';
import setupRoutes from './routes/queueAdminRoute';
import apiRoute from './routes';
import landingRoute from './routes/landingRoute';
import setErrors from './routes/errors';
import adminApi from './routes/admin-api';
// Load environment variables based on the current environment
const envFile = `.env.${process.env.NODE_ENV || 'local'}`;
dotenv.config({ path: envFile });

// Log current environment
console.log(
  `Running in ======${process.env.NODE_ENV || 'local'} mode ========`
);

// Initialize Express app
const app = express();
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Setup application routes
setupRoutes(app); // Setup queue admin routes
landingRoute(app); // Setup queue admin routes

app.use('/admin-api/v1', adminApi);
app.use('/api/v1', apiRoute);

setErrors(app);

export default app;
