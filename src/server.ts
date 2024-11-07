import app from './app'; // Import your express app
import { AppDataSource } from './config/data-source';

const PORT = process.env.PORT || 3000;

// Initialize database and start the server
AppDataSource.initialize()
  .then(() => {
    console.log('TypeORM Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
