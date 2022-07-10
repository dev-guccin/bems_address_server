const bacnet = require("node-bacnet");

const config = require("./config");
const client = new bacnet(config.bacnetconfig);

client.on("iAm", (msg) => {
  console.log("event iAm : ", msg);
});

client.on("whoIs", (msg) => {
  console.log("event whoIs : ", msg);
});

client.on("readPropertyMultiple", (msg) => {
  console.log("event readPropertyMultiple : ", msg);
  // 이벤트 발생시 해당 address를 토대로 값을 가져와야한다.
});

setInterval(() => {
  console.log("who IS!!!!");
  client.whoIs();
}, 1000 * 10);

setInterval(() => {
  console.log("iam!!!!");
  client.iAmResponse();
}, 1000 * 5);
