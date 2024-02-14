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
          res.status(200).json({ message: 'Login successful', email: email });
        } else {
          // Authentication failed
          res.status(401).json({ message: 'Login failed' });
        }
      }
    }
  );
});


app.post('/createUser/table', (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  db.query(`Create table IF NOT EXISTS ${userId}(
    Id int primary key auto_increment,
      batch int not null,
      section varchar(10) not null,
      img varchar(100) not null
  );`)
})


app.post('/loadbatch/data', (req, res) => {
  const { userReq } = req.body;
  db.query(`Create table IF NOT EXISTS ${userReq}(
    Id int primary key auto_increment,
      batch int not null,
      section varchar(10) not null,
      img varchar(100) not null
  );`)
  db.query(`SELECT * FROM ${userReq} ORDER BY batch ASC, section ASC`, (err, results) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json({ result: results });
    }
  })
})


app.post('/loadcourse/data', (req, res) => {
  const { user } = req.body;
  let batchUrl = user.split('batches');
  batchUrl = batchUrl[0] + 'courses' + batchUrl[1];
  console.log(user);
  db.query(`SELECT * FROM ${batchUrl} ORDER BY code ASC`, (err, results) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json({ result: results });
    }
  })
})


app.post('/loadStudent/data', (req, res) => {
  const { getSt } = req.body;
  const { code } = req.body;
  let user = getSt + 'students';
  db.query(`SELECT * FROM ${user} WHERE stCourseCode = '${code}' ORDER BY stId ASC`, (err, results) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json({ result: results });
    }
  })
})

app.post('/loadattendance/data', (req, res) => {
  const { user } = req.body;
  const { code } = req.body;
  let getAtt = user.split("students");
  getAtt = getAtt[0] + "attendance";
  db.query(`SELECT * FROM ${getAtt} WHERE CourseCode = '${code}' ORDER BY stId ASC`, (err, results) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json({ result: results });
    }
  })
})


app.post('/addData/:user', (req, res) => {
  db.query(`Create table IF NOT EXISTS users(
    Id int primary key auto_increment,
      email varchar(50) not null,
      password varchar(100) not null
  );`)
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


app.post('/addBatches/:userReq', (req, res) => {
  const userReq = req.params.userReq;
  const { batch, sec, img } = req.body;
  let batchUrl = userReq.split('batches');
  batchUrl = batchUrl[0] + 'courses' + batch + sec;
  db.query(`Create table IF NOT EXISTS ${batchUrl}(
    Id int primary key auto_increment,
      code varchar(50) not null,
      title varchar(100) not null,
      img varchar(100) not null
  );`)
  const sql = `INSERT INTO ${userReq} (id,batch,section,img) VALUES (?,?,?,?)`;
  let id = 'NULL';
  db.query(sql, [id, batch, sec, img], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).send("Error");
    } else {
      res.json({ message: 'Batch added successfully', id: result.insertId, Error: '' })
    }
  });
});


app.post('/addCourse/:user', (req, res) => {
  const user = req.params.user;
  const { code, title, img } = req.body;
  let batchUrl = user.split('batches');
  batchUrl = batchUrl[0] + 'courses' + batchUrl[1];
  let students = user + "students";
  db.query(`Create table IF NOT EXISTS ${students}(
    Id int primary key auto_increment,
      stId varchar(50) not null,
      stName varchar(100) not null,
      stBatch varchar(10) not null,
      stSection varchar(10) not null,
      stCourseCode varchar(100) not null
  );`)
  const sql = `INSERT INTO ${batchUrl} (id,code,title,img) VALUES (?,?,?,?)`;
  let id = 'NULL';
  db.query(sql, [id, code, title, img], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).send("Error");
    } else {
      res.json({ message: 'Batch added successfully', id: result.insertId, Error: '' })
    }
  });
});


app.post('/addStudent/:target', (req, res) => {
  const target = req.params.target;
  const { id, name, batch, section, code } = req.body;
  let batchUrl = target.split("students");
  batchUrl = batchUrl[0] + 'Attendance';
  console.log(section);
  db.query(`Create table IF NOT EXISTS ${batchUrl}(
    Id int primary key auto_increment,
      date varchar(50) not null,
      stId varchar(50) not null,
      courseCode varchar(50) not null,
      Attendance varchar(50) not null
  );`)
  const sql = `INSERT INTO ${target} (Id,stId,stName,stBatch,stSection,stCourseCode) VALUES (?,?,?,?,?,?)`;
  let Id = 'NULL';
  db.query(sql, [Id, id, name, batch, section, code], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).send("Error");
    } else {
      res.json({ message: 'Batch added successfully', id: result.insertId, Error: '' })
      console.log(target);
    }
  });
});


app.post('/addAllStudent/:target/:code', (req, res) => {
  const target = req.params.target;
  const code = req.params.code;
  let batchUrl = target.split("students");
  batchUrl = batchUrl[0] + 'Attendance';
  const updatedData = req.body;
  db.query(`Create table IF NOT EXISTS ${batchUrl}(
    Id int primary key auto_increment,
      date varchar(50) not null,
      stId varchar(50) not null,
      courseCode varchar(50) not null,
      Attendance varchar(50) not null
  );`)
  updatedData.forEach(async (row) => {
    const id = row[1];
    const name = row[2];
    const batch = row[3];
    const sec = row[4];
    const sql = `INSERT INTO ${target} (Id,stId,stName,stBatch,stSection,stCourseCode) VALUES (?,?,?,?,?,?)`;
    let Id = 'NULL';
    db.query(sql, [Id, id, name, batch, sec, code], (err, result) => {
      // if (err) {
      //   console.error('Error executing MySQL query: ', err);
      //   res.status(500).send("Error");
      // } else {
      //   res.json({ message: 'Batch added successfully', id: result.insertId, Error: '' })
      //   console.log(target);
      // }
    });
  });

  res.send('Data updated successfully');
});


app.post('/deleteBatch/:userReq', (req, res) => {
  const userReq = req.params.userReq;
  const { batch, sec } = req.body;
  const sql = `DELETE FROM ${userReq} WHERE batch = ${batch} AND section = '${sec}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).send("Error");
    } else {
      res.json({ message: 'Batch delete successfully', Error: '' });
    }
  });
});


app.post('/deleteStudent/:target', (req, res) => {
  const target = req.params.target;
  const { delId, code } = req.body;
  const sql = `DELETE FROM ${target} WHERE stId = ${delId} AND stCourseCode = '${code}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).send("Error");
    } else {
      res.json({ message: 'Batch delete successfully', Error: '' });
    }
  });
});

app.post('/deleteCourse/:user', (req, res) => {
  const url = req.params.user;
  let user = url.split("batches");
  user = user[0] + 'courses' + user[1];
  const { code } = req.body;
  const sql = `DELETE FROM ${user} WHERE code = '${code}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).send("Error");
    } else {
      res.json({ message: 'Batch delete successfully', Error: '' });
    }
  });
});


app.post('/addAttendance/:target', (req, res) => {
  let target = req.params.target;
  target = target.split("students");
  target = target[0] + 'Attendance';
  const data = req.body.data;
  const { code, today } = req.body;
  let sql = `INSERT INTO ${target} (Id,date,stId,courseCode,Attendance) VALUES `;
  let Id = 'NULL';
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      let qur = `('${Id}','${today}','${key}','${code}','${value}'),`;
      sql += qur;
    }
  }
  sql = sql.slice(0, -1);
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).send("Error");
    } else {
      res.json({ message: 'Batch added successfully', id: result.insertId, Error: '' })
    }
  });
})


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
