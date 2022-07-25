const net = require("net");
const modbus = require("jsmodbus");
const netServer = new net.Server(); // 소켓 서버를 생성한다.
const holding = Buffer.alloc(10000); // 버퍼 사이즈를 지정한다.

const DBH = require('./database');
const { dbconfig } = require("./config");

const server = new modbus.server.TCP(netServer, {
  holding: holding,
});
server.on("connection", function (client) {
  console.log("New Connection");
  DBH.checkDatabase();
});

server.on("preReadHoldingRegisters", function (request, cb) {
  console.log("preReadHoldingRegisters");
  server.emit("readHoldingRegisters", request, cb);
  console.log(request.address); // slaveID
  console.log(request.body); // { _fc: 3, _start: 100, _count: 10 }
  console.log(request.byteCount); // request의 byte 카운트
  console.log(request.slaveId); // slaveID
  console.log(request.unitId); // slaveID
  console.log(cb);

  // server.holding.writeInt16BE(0x0101, 0);
  console.log(server.holding.buffer);
});

server.on("readHoldingRegisters", function (request, response, send) {
  /* Implement your own */
  console.log("readHoldeing!!!!!");
  console.log(server.holding.buffer);

  // console.log("readHoldeing", request);
  // console.log("readHoldeing", response);

  // console.log(response.body);

  // send(response);
});

server.on("postReadHoldingRegisters", function (request, cb) {
  console.log("postReadHoldingRegisters");
  console.log(cb);
  server.holding.writeInt16BE(0x0101, 0);

  // console.log(request);
  // console.log(response);

  // client
  //   .readHoldingRegisters(0, 10)
  //   .then(function (resp) {
  //     console.log("client");
  //     console.log(resp.response._body.valuesAsArray);
  //     socket.end();
  //   })
  //   .catch(function () {
  //     console.error(
  //       require("util").inspect(arguments, {
  //         depth: null,
  //       })
  //     );
  //     socket.end();
  //   });
});

server.on("preWriteSingleRegister", function (value, address) {
  console.log("preWriteSingleRegister");
  console.log(value.address); // slaveId
  console.log(value.body); //  { _fc: 6, _address: 1, _value: 1 }

  // console.log('Original {register, value}: {', address, ',', server.holding.readUInt16BE(address), '}')
});

server.on("WriteSingleRegister", function (value, address) {
  console.log("WriteSingleRegister" + value);
  // console.log('New {register, value}: {', address, ',', server.holding.readUInt16BE(address), '}')
});

server.on("writeMultipleCoils", function (value) {
  console.log("Write multiple coils - Existing: ", value);
});

server.on("postWriteMultipleCoils", function (value) {
  console.log("Write multiple coils - Complete: ", value);
});

/* server.on('writeMultipleRegisters', function (value) {
    console.log('Write multiple registers - Existing: ', value)
  }) */

server.on("postWriteMultipleRegisters", function (value) {
  console.log("Write multiple registers - Complete: ", holding.readUInt16BE(0));
});

server.on("connection", function (client) {
  /* work with the modbus tcp client */
});
console.log(502);
netServer.listen(502, "127.0.0.1"); // 포트 수신을 시작함
