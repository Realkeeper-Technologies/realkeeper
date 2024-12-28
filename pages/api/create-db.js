// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mysql from 'mysql2/promise';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

// Initialize Secret Manager Client
const secretClient = new SecretManagerServiceClient();

// Function to get secret from Google Secret Manager (if necessary)
async function getSecret(secretName) {
  const projectId = 'inspired-victor-446107-t9';  // Replace with your GCP project ID
  const [version] = await secretClient.accessSecretVersion({
    name: `projects/${projectId}/secrets/${secretName}/versions/latest`,
  });

  const payload = version.payload.data.toString('utf8');
  return payload;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const dbConfig = {
    host: req.headers.host.includes('localhost') ? process.env.DATABASE_HOST : await getSecret('mysql-internal-ip'),
    user: process.env.DATABASE_USER,     
    password: req.headers.host.includes('localhost') ? process.env.DATABASE_PASSWORD : await getSecret('mysql-deepak-pwd'), 
    database:process.env.DATABASE_NAME
  };
  console.log(dbConfig);
  console.log(req.headers.host);

  try {
    // Step 1: Create a connection
    const connection = await mysql.createConnection(dbConfig);
    console.log("=====hoho=====");
    console.log(connection);

    // Step 2: Create the database
    // await connection.query('CREATE DATABASE IF NOT EXISTS root');

    // Step 3: Use the database
    // await connection.query('USE root');

    // Step 4: Create the table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS table2 (
        name VARCHAR(255),
        phoneno VARCHAR(15)
      );
    `;
    await connection.query(createTableQuery);

    // Step 5: Close the connection
    await connection.end();

    res.status(200).json({ message: 'Database and table created successfully!', sqlConfigBeingUsed:dbConfig });
  } catch (error) {
    console.error('ErrorINLINE:', error);
    console.error('ErrorINLINE2:', error.message);
    res.status(500).json({ message: 'An error occurred', error: error.message, sqlConfigBeingUsed:dbConfig});
  }
}
