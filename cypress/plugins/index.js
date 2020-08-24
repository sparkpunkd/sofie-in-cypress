const dgram = require('dgram')
const got = require('got')

const casparSocket = dgram.createSocket({ type: 'udp4', reuseAddr: true }).bind(52500);
const atemSocket = dgram.createSocket({ type: 'udp4', reuseAddr: true }).bind(52502);

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    caspar (lookFor) {
      console.log('Waiting for caspar to', lookFor)
      let start = process.hrtime()

      return new Promise((resolve, reject) => {
        let eventTimer = setTimeout(() => {
          casparSocket.removeAllListeners();
          reject(new Error('Failed to receive looked for message from Caspar in time'));
        }, config.taskTimeout);
        casparSocket.on('message', (m) => {
          let ms = m.toString();
          console.log('Received from caspar:', ms);
          if (ms.indexOf(lookFor) >= 0) {
            let endTime = process.hrtime(start);
            clearTimeout(eventTimer);
            casparSocket.removeAllListeners();
            got(`${config.env['host']}/api/0/publication/userActionsLog/%7B%7D/undefined`)
              .json()
              .then(actions => {
                let lastAct = actions.reverse().find(x => x.method === 'userAction.take');
                resolve({ lookFor, matched: ms, timing: endTime, takeExecutionTime: lastAct.executionTime });
              },
              reject);
          }
        })
      })
    },
    atem (lookFor) {
      console.log('Waiting for atem to', lookFor)
      let start = process.hrtime()

      return new Promise((resolve, reject) => {
        let eventTimer = setTimeout(() => {
          casparSocket.removeAllListeners();
          reject(new Error('Failed to receive looked for command sent to Atem in time'));
        }, config.taskTimeout);
        atemSocket.on('message', (m) => {
          let ms = m.toString();
          console.log('Received from Atem:', ms);
          if (ms.indexOf(lookFor) >= 0) {
            let endTime = process.hrtime(start);
            clearTimeout(eventTimer);
            atemSocket.removeAllListeners();
            got(`${config.env['host']}/api/0/publication/userActionsLog/%7B%7D/undefined`)
            .json()
            .then(actions => {
              let lastAct = actions.reverse().find(x => x.method === 'userAction.take');
              resolve({ lookFor, matched: ms, timing: endTime, lastTake: lastAct });
            },
            reject);
          }
        })
      })
    }
  })
}
