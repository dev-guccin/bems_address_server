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
      connection.query(
        `select * from realtime_table`,
        (error, rows, fields) => {
          if (error) throw error;
          console.log(rows);
          resolve();
        }
      );
    });
  },
  getValueByAddress: function (address) {
    // address type is integer
    return new Promise(function (resolve, reject) {
      connection.query(
        `select * from realtime_table where address=${address}`,
        (error, rows, fields) => {
          try {
            if (error) throw error;
            // 값이 비어있는 경우
            if (rows.length == 0) {
              throw new Error("어드레스가 잘못되었습니다. address:" + address);
            }
            // 값이 여러개인 경우
            if (rows.length > 1) {
              throw new Error(
                "중복된 어드레스가 존재합니다. address:" + address
              );
            }
          } catch (err) {
            reject(err);
          }
          resolve(rows);
        }
      );
    });
  },
  getValuesByAddress: function (address, length) {
    // address type is integer
    return new Promise(function (resolve, reject) {
      // 데이터가 비어있는 경우 어떻게 받을 것인가???
      connection.query(
        `select * from realtime_table where ${address} <= address and address < ${
          address + length
        } order by address asc`,
        (error, rows, fields) => {
          try {
            if (error) throw error;
            // 값이 비어있는 경우
            if (rows.length == 0) {
              throw new Error("어드레스가 잘못되었습니다. address:" + address);
            }
            // 값을 받았는데 값의 개수가 length만큼이 아니다?
            if (rows.length != length) {
              throw new Error(
                "어드레스에 누락된 값이 존재합니다. length를 수정하거나 엑셀을 확인하세요. address:" +
                  address
              );
            }
          } catch (err) {
            reject(err);
          }
          resolve(rows);
        }
      );
    });
  },
};

module.exports = Database;
