import { spawn } from 'child_process'
import * as dgram from 'dgram'
import { platform } from 'os'
import { sep } from 'path'

const dgramSocket = dgram.createSocket('udp4')

const folder = platform() === 'linux' ? 'dist-linux' : 'dist-win'
const executable = platform() === 'linux' ? 'AtemMock' : 'AtemMock.exe'

let mockAtem = spawn(
    __dirname + `${sep}fakeAtem${sep}${folder}${sep}${executable}`, 
    [ '2me-v8.1.data' ], 
    { shell: true, cwd: __dirname + sep + 'fakeAtem' })

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

