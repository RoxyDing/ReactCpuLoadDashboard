var webpack = require('webpack');
var path = require('path');
var public_dir = "src"



module.exports = {
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname,public_dir,'index.js')
    ],
    plugins: [
    new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        path:path.join(__dirname,'/dist/'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.(ico)$/,
                loader: "static-loader"
            },
            {
                test: /\.(txt)$/,
                loader: "static-loader"
            },
                        {
                        test: /\.(json)$/,
                        loader: "static-loader"
                        },
            { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
            { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" },
            { test: /\.png$/,    loader: "file-loader" }]
    },
    resolve: {
        extensions:['', '.js', '.jsx','.css' , '.json','.txt','.ico']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './public'
    },
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    }
};




/*module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/public/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './public'
    },
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    }
};*/

