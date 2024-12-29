import createNewConnection from './get-sql-connection';

export default async function updateDB(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }
    try {
        const connection = await createNewConnection(req);
    
        // Step 4: Create the table 
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS org1 (
              org_name VARCHAR(50) NOT NULL,
              user_name VARCHAR(50) NOT NULL,
              org_phoneno VARCHAR(15) NOT NULL PRIMARY KEY,
              org_login_pin INT(6) NOT NULL
          );
        `;
        await connection.query(createTableQuery);
    
        // Step 5: Close the connection
        await connection.end();
    
        res.status(200).json({ message: 'Table created successfully!'});
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred', error: error.message});
        return error;
      }

}