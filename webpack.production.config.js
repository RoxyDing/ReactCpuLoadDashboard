const path = require('path');
const webpack = require('webpack');


module.exports = {
    //devtool:'eval',
    devtool: 'source-map',
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/public/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            // test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel'
        },{
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                // __PROD__: true
            }
        })
    ]

};