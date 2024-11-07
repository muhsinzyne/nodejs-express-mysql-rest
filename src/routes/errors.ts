import { Express } from 'express';
export default function setErrors(app: Express) {
  app.use((req, res) => {
    res.status(404).json({
      message: `Cannot GET ${req.originalUrl}`,
      status: 404,
    });
  }); // Main API routes
}
