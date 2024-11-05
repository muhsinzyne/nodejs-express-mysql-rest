#!/usr/bin/env ts-node

import { execSync } from 'child_process';

// Execute the Sequelize CLI command
execSync('npx sequelize-cli ' + process.argv.slice(2).join(' '), {
  stdio: 'inherit',
});
