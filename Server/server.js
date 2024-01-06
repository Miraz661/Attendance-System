const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(bodyParser.json());

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
  const { email, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        res.status(500).send('Internal Server Error');
      } else {
        if (results.length > 0) {
          // Authentication successful
          res.status(200).json({ message: 'Login successful',email:email });
        } else {
          // Authentication failed
          res.status(401).json({ message: 'Login failed' });
        }
      }
    }
  );
});


app.post('/createUser/table',(req,res)=>{
  const {userId} = req.body;
  console.log(userId);
  db.query(`Create table ${userId}(
    Id int primary key auto_increment,
      batch int not null,
      section varchar(10) not null,
      img varchar(100) not null
  );`)
})


app.post('/loadbatch/data',(req,res)=>{
  const {userReq} = req.body;
  db.query(`SELECT * FROM ${userReq}`,(err,results)=>{
    if(err){
      res.status(500).send("Internal Server Error");
    }else{
      res.status(200).json({result:results});
    }
  })
})



app.post('/addData/:user', (req, res) => {
  const user = req.params.user;
  const { email, password } = req.body;
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


app.post('/verify/user', async (req, res) => {
  const email = req.body.email;
  try {
    const verificationCode = generateVerificationCode();
    await sendVerificationEmail(email, verificationCode);

    res.status(200).json({ message: 'User signed up successfully', code: verificationCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendVerificationEmail = async (email, code) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mirazh661@gmail.com',
      pass: 'pdtu bjfe aeyo idal',
    },
  });

  const mailOptions = {
    from: 'mirazh661@gmail.com',
    to: email,
    subject: 'Verification Code for Signup To E-Attendance',
    text: `Your verification code is: ${code}`,
  };
  await transporter.sendMail(mailOptions);
};


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
