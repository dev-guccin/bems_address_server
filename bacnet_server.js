const bacnet = require('node-bacnet')

const config = require('./config')
const client = new bacnet(config.bacnetconfig)

client.on('iAm', (msg) => {
  console.log('iam : ', msg)
})

client.on('whoIs', (msg) => {
  console.log("whoISSSSS")
})
