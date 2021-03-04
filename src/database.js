var mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test',
    multipleStatements: true
  });
  
  mysqlConnection.connect((err) => {
      if (!err) {
          console.log("connected");
      } else {
          console.log("gagal connect");
      }
  });

  module.exports= mysqlConnection;