require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');
 
const app = express();


const saltRounds = 10;

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Express middleware
app.use(cors());
app.use(express.json());

// Register route
app.post('/registrationform', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = 'INSERT INTO form (`name`, `email`, `password`) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Error registering user' });
      } else {
        res.json({ message: 'User registered successfully' });
      }
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  
  console.log(`Server started on port ${port}`);
});
