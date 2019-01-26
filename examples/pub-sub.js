// Publish / subscribe example

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
        const payload = {
            device_id: 'test'
        }
        const topic = '/unit_taken'
        device.subscribe(topic, null, (err) => {
            if (err) {
                console.error('error subscribing to topic', topic)
                process.exit(1)
            }
            
            device.publish(topic, JSON.stringify(payload), {}, (error) => {
                if (error) {
                    console.log(error)
                    process.exit(1)
                }
            
                console.log('message published')
            })
        })
    })
    
    device.on('message', (topic, payload) => console.log('Received message', topic, payload.toString()))
}

module.exports = run;

if (require.main === module) {
    run()
}