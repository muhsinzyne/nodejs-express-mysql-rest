/* eslint-disable no-undef */
// scripts/generateMigration.js

const fs = require('fs');
const path = require('path');

const migrationName = process.argv[2];
if (!migrationName) {
    console.error('Please provide a migration name.');
    process.exit(1);
}

const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 14);
const migrationFileName = `${timestamp}-` + migrationName + '.ts';
const migrationsDir = path.join(__dirname, '..', 'src/database/migrations');

if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir);
}

const migrationTemplate = `import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
    // Define your migration logic here
};

export const down = async (queryInterface: QueryInterface) => {
    // Define your rollback logic here
};
`;

fs.writeFileSync(path.join(migrationsDir, migrationFileName), migrationTemplate.trim());
console.log(`Migration file created: ${migrationFileName}`);
