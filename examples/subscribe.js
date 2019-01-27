const awsIot = require('aws-iot-device-sdk')

const Config = require('../config')

const device = new awsIot.device({
    clientId: Config,
    host: Config.host,
    secretKey: Config.secretKey,
    accessKeyId: Config.accessKey,
    protocol: 'wss',
})

const run = () => {
    device.on('connect', () => {
        const topic = '/user/*/trip_start'
        device.subscribe(topic, null, (err) => {
            if (err) {
                console.error('error subscribing to topic', topic)
                process.exit(1)
            }
            
            console.log(`subscribed to topic "${topic}"`)
        })
    })
    
    device.on('message', (topic, payload) => console.log('Received message', topic, payload.toString()))
}

module.exports = run;

if (require.main === module) {
    run()
}