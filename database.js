var mysql = require("mysql");
const config = require("./config");

const connection = mysql.createConnection(config.dbconfig);

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
}); // 실제로 연결이 된다.

var Database = {
  checkDatabase: function () {
    return new Promise(function (resolve, reject) {
      connection.query(`select * from realtime_table`, (error, rows, fields) => {
        if (error) throw error
        console.log(rows)
        resolve()
      })
    })
  },
  getValueByAddress: function (address) { // address type is integer
    return new Promise(function (resolve, reject) {
      connection.query(`select * from realtime_table where address=${address}`, (error, rows, fields) => {
        if (error) throw error
        console.log(rows)
        resolve(rows)
      })
    })
  },
  getValuesByAddress: function (address, length) { // address type is integer
    return new Promise(function (resolve, reject) {
      // 데이터가 비어있는 경우 어떻게 받을 것인가???
      connection.query(`select * from realtime_table where ${address} <= address and address < ${address+length}`, (error, rows, fields) => {
        if (error) throw error
        console.log(rows)
        resolve(rows)
      })
    })
  }
}

module.exports = Database
