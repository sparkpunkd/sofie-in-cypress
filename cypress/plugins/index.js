const dgram = require('dgram')

const dgramSocket = dgram.createSocket({ type: 'udp4', reuseAddr: true}).bind(52500)

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    caspar (lookFor) {
      console.log('Waiting for caspar to', lookFor)
      let start = process.hrtime()

      return new Promise((resolve) => {
        dgramSocket.on('message', (m) => {
          let ms = m.toString();
          console.log('Received from Caspar:', ms);
          if (ms.indexOf(lookFor) >= 0) {
            dgramSocket.removeAllListeners();
            resolve({ matched: ms, timing: process.hrtime(start) });
          }
        })
      })
    }
  })
}
