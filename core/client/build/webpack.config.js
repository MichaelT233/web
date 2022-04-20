const path = require('path')

module.exports = {
    mode: 'development',
    devtool: false,
    entry: '../init.js',
    output: {
        path: path.resolve(__dirname, '../../server/gateway/public/js'),
        filename: 'client.js',
    },
}