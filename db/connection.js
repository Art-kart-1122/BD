const mysql = require('mysql');



const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1qaz2wsx3edc',
  database:'corect_db'
});

mysqlConnection.connect(function(err) {
  if(err) {
    console.log('Error connecting to Db');
    throw err;
  }
  console.log('Connection established');
});

module.exports = mysqlConnection;