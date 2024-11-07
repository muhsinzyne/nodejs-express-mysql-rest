/* eslint-disable @typescript-eslint/no-require-imports */
import * as child_process from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

// Get the current date/time for dynamic filename if no name is provided
const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
const migrationName = `Migration_${process.argv[2] || 'rand'}_${timestamp}`; // Default to timestamp if no name is passed

// Define the migration directory
const migrationDir = 'src/typeorm/migrations/';

// Ensure the migration directory exists
if (!fs.existsSync(migrationDir)) {
  fs.mkdirSync(migrationDir, { recursive: true });
}

// Define the full path for the migration file
const migrationFilePath = `${migrationDir}${migrationName}`;

console.log(`Migration file will be generated at: ${migrationFilePath}`);
console.log(`Migration file will be: ${migrationName}`);

// Run the TypeORM generate migration command
const generateMigrationCommand = `npm run migration:generate -n ${migrationFilePath}`;

console.log(generateMigrationCommand);

child_process.exec(generateMigrationCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error generating migration: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`Migration generated successfully: ${stdout}`);
});
