let config = {
  dbconfig: {
    host: "localhost",
    user: "root",
    password: "4msys", //db 패스워드
    database: "bems",
  },
  bacnetconfig: {
    port: 47808, //bacnet의 기본 주소
    interface: "192.168.219.102", // 현재 서버의 로컬 ip
    broadcastAddress: "192.168.219.255",
    apduTimeout: 10000,
  },
};

module.exports = config;
