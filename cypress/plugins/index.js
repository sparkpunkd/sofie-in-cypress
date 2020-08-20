const dgram = require('dgram')

const casparSocket = dgram.createSocket({ type: 'udp4', reuseAddr: true }).bind(52500)
const atemSocket = dgram.createSocket({ type: 'udp4', reuseAddr: true }).bind(52502);

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    caspar (lookFor) {
      console.log('Waiting for caspar to', lookFor)
      let start = process.hrtime()

      return new Promise((resolve) => {
        casparSocket.on('message', (m) => {
          let ms = m.toString();
          console.log('Received from Caspar:', ms);
          if (ms.indexOf(lookFor) >= 0) {
            casparSocket.removeAllListeners();
            resolve({ matched: ms, timing: process.hrtime(start) });
          }
        })
      })
    },
    atem (lookFor) {
      console.log('Waiting for atem to', lookFor)
      let start = process.hrtime()

      return new Promise((resolve) => {
        console.log('Wakey wakey');
        atemSocket.on('message', (m) => {
          let ms = m.toString();
          console.log('Received from Atem:', ms);
          if (ms.indexOf(lookFor) >= 0) {
            atemSocket.removeAllListeners();
            resolve({ matched: ms, timing: process.hrtime(start) });
          }
        })
      })
    }
  })
}
