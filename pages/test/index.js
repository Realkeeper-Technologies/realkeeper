// File: /pages/create-db.js
import { useState } from 'react';

export default function CreateDbPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateDb = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/create-db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        console.log(data);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
        console.log(errorData);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Create MySQL Database</h1>
      <button
        onClick={handleCreateDb}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px',
        }}
      >
        {loading ? 'Creating...' : 'Create Database & Table'}
      </button>
      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
}
