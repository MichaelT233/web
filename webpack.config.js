const path = require('path')

module.exports = {
    mode: 'development',
    devtool: false,
    entry: './client.js',
    output: {
        path: path.resolve(__dirname, './client/public/build'),
        filename: 'webClient.js',
    },
}