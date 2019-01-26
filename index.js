const publishExample = require('./examples/pub-sub')
const shadowExample = require('./examples/shadow')


module.exports = {
    runShadowExample: shadowExample,
    runPublishExample: publishExample
}

shadowExample()