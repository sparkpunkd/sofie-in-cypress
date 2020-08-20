import { spawn } from 'child_process'
import * as dgram from 'dgram'

const dgramSocket = dgram.createSocket('udp4')

let mockAtem = spawn(
    __dirname + '\\fakeAtem\\dist-win\\AtemMock.exe', 
    [ '2me-v8.1.data' ], 
    { shell: true, cwd: __dirname + '\\fakeAtem' })

mockAtem.stdout.on('data', d => {
    let ds = d.toString()
    if (ds.indexOf('AckReply') >= 0) {
        return
    }
    let command = ds.indexOf('Received command')
    if (command >= 0) {
        // console.log(ds);
        dgramSocket.send(
            `atem command: ${ds.slice(command + 17, command + 22)}`,
            52502,
            '127.0.0.1')
    }
})

mockAtem.stderr.on('data', d => {
    console.log("stderr:", d.toString())
})

