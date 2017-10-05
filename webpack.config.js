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
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel'
        },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
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
    // sassLoader: {
    //     data: '@import "' + path.resolve(__dirname, 'theme/_theme.scss') + '";'
    // },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                // __PROD__: true
            }
        })
    ]

};

