// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mysql from 'mysql2/promise';
import getSecret from './get-managed-secret';

export default async function createSqlConnection(req) {
  const dbConfig = {
    host: req.headers.host.includes('localhost') ? process.env.DATABASE_HOST : await getSecret('mysql-internal-ip'),
    user: process.env.DATABASE_USER,     
    password: req.headers.host.includes('localhost') ? process.env.DATABASE_PASSWORD : await getSecret('mysql-deepak-pwd'), 
    database:process.env.DATABASE_NAME
  };

  try {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
}
