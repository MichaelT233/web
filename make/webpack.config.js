const path = require('path')

module.exports = {
    mode: 'development',
    devtool: false,
    entry: {
        productFrontend: '../product/fe/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../server/public/js'),
        filename: 'productBundle.js',
    },
}