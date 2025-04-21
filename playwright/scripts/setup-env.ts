import promptSync from 'prompt-sync';
import figlet from 'figlet';
import path from 'path';
import fs from 'fs';
import dotenv from '@dotenvx/dotenvx';
import { testUsers } from '../config/test-users.const';
import { TestUser } from '../models/test-user.interface';
dotenv.config();

const safePasswordPageLink = 'https://okamba.atlassian.net/wiki/spaces/Dev/pages/264473187/Ladestander+-+Test';

const prompt = promptSync();

const greeting = figlet.textSync('OK E2E', {
  font: '3D-ASCII',
});

// Function to prompt for environment variable if not set
function promptUserPassword(user: TestUser): void {
  if (!process.env[user.password]) {
    const value = prompt(`Please enter password for ${user.username}: `);
    if (value) {
      // Write the variable to .env file
      const envFilePath = path.resolve(__dirname, '../../.env');
      fs.appendFileSync(envFilePath, `${user.password}=${value}\n`, 'utf-8');
      console.log(`Password for ${user.username} has been written to .env file`);
    }
  } else {
    console.log(`${user.username} is already set`);
  }
}

function promptBaseUrl(): void {
  if (!process.env.BASE_URL) {
    const value = prompt(
      'Please enter the url you will be testing: 👇\neg. \x1b[34mhttp://localhost:4200\x1b[0m or \x1b[34mhttps://some-app.test.ok.dk\x1b[0m \n'
    );
    if (value) {
      const envFilePath = path.resolve(__dirname, '../../.env');
      fs.appendFileSync(envFilePath, `BASE_URL=${value}\n`, 'utf-8');
      console.log('BASE_URL has been written to .env file');
    }
  } else {
    console.log('BASE_URL is already set');
  }
}

// Greet the dev with some ASCII art
console.log(greeting);

// Prompt for the base URL
promptBaseUrl();

// Log a link to the safe password page
console.log('Setup passwords for the e2e test users', '\n', `Find the passwords here 👉 \x1b[34m${safePasswordPageLink}\x1b[0m`, '\n');

// Dynamically prompt for passwords of all test users
testUsers.forEach(user => {
  promptUserPassword(user);
});

console.log('\n', 'Environment variables are set up successfully 🥳');
console.log('\n', 'Happy testing 🧪🤪');
