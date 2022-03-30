const path = require('path')

module.exports = {
    mode: 'development',
    devtool: false,
    entry: {
        cartFrontend: '../cart/cart-frontend.js',
        productFrontend: '../product/product-frontend.js',
        checkoutFrontend: '../checkout/checkout-frontend.js'
    },
    output: {
        path: path.resolve(__dirname, '../server/public/js'),
        filename: 'bundle.js',
    },
}