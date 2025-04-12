const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'mydb'
});

connection.connect(err => {
  if (err) {
    console.error('Kết nối MySQL thất bại:', err);
    return;
  }
  console.log('Đã kết nối MySQL');
});

app.get('/', (req, res) => {
  connection.query('SELECT NOW() as now', (err, results) => {
    if (err) {
      return res.status(500).send('Lỗi truy vấn');
    }
    res.send(`Thời gian hiện tại từ DB: ${results[0].now}`);
  });
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
