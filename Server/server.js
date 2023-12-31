const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ractdatabase',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.post('/auth', (req, res) => {
    const {email,password} = req.body;
    db.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (err, results) => {
          if (err) {
            res.status(500).send('Internal Server Error');
          } else {
            if (results.length > 0) {
              // Authentication successful
              res.status(200).json({ message: 'Login successful' });
            } else {
              // Authentication failed
              res.status(401).json({ message: 'Login failed' });
            }
          }
        }
      );
});


app.post('/addData', (req, res) => {
    const { email, password } = req.body;
    let user = 'users';
    console.log(typeof (password), password);
    const sql = `INSERT INTO ${user} (id,email,password) VALUES (?,?,?)`;
    let id = 'NULL';
    db.query(sql, [id, email, password], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send("Error");
        } else {
            res.json({ message: 'Signup successfully', id: result.insertId, Error: '' });
        }
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});