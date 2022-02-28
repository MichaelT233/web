const path = require('path')

module.exports = {
    mode: 'development',
    devtool: false,
    entry: './webClient.js',
    output: {
        path: path.resolve(__dirname, './client/public/js'),
        filename: 'webClient.js',
    },
}