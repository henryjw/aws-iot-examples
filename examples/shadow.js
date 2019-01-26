const awsIot = require('aws-iot-device-sdk')

const Config = require('../config')

const THING_NAME = Config.thingName

const { exit } = process
const print = (key, value) => `${key}=${value}`
const prettyPrintObj = obj => JSON.stringify(obj, null, 2)

const shadow = new  awsIot.thingShadow({
    clientId: Config,
    host: Config.host,
    // Can also authenticate to AWS IOT via CA cert., but using IAM credentials or a Cognito session token is easier
    secretKey: Config.secretKey,
    accessKeyId: Config.accessKey,

    protocol: 'wss',
})

function run() {
    shadow.on('connect', () => {
        const registerConfig = {}
        shadow.register(THING_NAME, registerConfig, registerCallback)
        shadow.on('status', statusChangeCallback)
        shadow.on('delta', deltaChangeCallback)
    })
    
    shadow.on('error', (err) => {
        console.log('error', err);
        exit()
    })
}

function registerCallback(){
    const desiredState = {
        locked: true
    }
    const payload = {
        state: {
            desired: desiredState
        }
    }

    const token = shadow.update(THING_NAME, payload)

    if (!token) {
        return console.error('Shadow update failed')
    }

    console.log(token)
}

function statusChangeCallback(thingName, status, clientToken, state) {
    console.log(
        'on status',
        print('name', thingName),
        print('status', status),
        print('token', clientToken),
        print('state', prettyPrintObj(state))
    )

    // exit()
}

function deltaChangeCallback(thingName, state) { 
    console.log(
        'on delta',
        print('name', thingName),
        print('state', prettyPrintObj(state))
    )
}

module.exports = run;

if (require.main === module) {
    run()
}