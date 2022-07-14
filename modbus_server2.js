"use strict";
// create an empty modbus client
const ModbusRTU = require("modbus-serial");
const DBH = require("./database");

const vector = {
  getInputRegister: function (addr, unitID) {
    // Synchronous handling
    return addr;
  },
  getHoldingRegister: async function (addr, unitID, callback) {
    // getMultipleHoldingRegisters보다 처리가 후순위라 같이 사용하면 안뜨는듯
    console.log("getHoldingRegister");
    let item;
    try {
      const items = await DBH.getValueByAddress(addr);
      item = items[0];
    } catch (err) {
      console.log("server 에러");
      console.log(err);
      callback(null, 0);
      return;
    }
    console.log(item);
    console.log(item.log_value);
    callback(null, item.log_value);
  },
  getMultipleHoldingRegisters: async function (addr, length, unitID, callback) {
    console.log("getMultipleHoldingRegisters");
    console.log("address:" + addr); // 'address 기준으로 DB에서 데이터를 꺼내서 반환해준다.
    console.log("unitID:" + unitID);
    // callback(null, addr);
    let values = Array(length).fill(0);

    // get data by address
    try {
      const items = await DBH.getValuesByAddress(addr, length);
      console.log(items);
      for (let i = 0; i < length; i++) {
        values[i] = items[i].log_value;
      }
    } catch (err) {
      console.log("server 에러");
      console.log(err);
    }

    // callback(null, )
    callback(null, values);
  },
  getCoil: function (addr, unitID) {
    // Asynchronous handling (with Promises, async/await supported)
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(addr % 2 === 0);
      }, 10);
    });
  },
  setRegister: function (addr, value, unitID) {
    // Asynchronous handling supported also here
    console.log("set register", addr, value, unitID);
    return;
  },
  setCoil: function (addr, value, unitID) {
    // Asynchronous handling supported also here
    console.log("set coil", addr, value, unitID);
    return;
  },
  readDeviceIdentification: function (addr) {
    return {
      0x00: "MyVendorName",
      0x01: "MyProductCode",
      0x02: "MyMajorMinorRevision",
      0x05: "MyModelName",
      0x97: "MyExtendedObject1",
      0xab: "MyExtendedObject2",
    };
  },
};

// set the server to answer for modbus requests
console.log("ModbusTCP listening on modbus://0.0.0.0:8502");
// const serverTCP = new ModbusRTU.ServerTCP(vector, { host: "0.0.0.0", port: 8502, debug: true, unitID: 1 });
const serverTCP = new ModbusRTU.ServerTCP(vector, {
  host: "0.0.0.0",
  port: 8502,
  debug: true,
});

serverTCP.on("socketError", function (err) {
  // Handle socket error if needed, can be ignored
  console.error(err);
});
