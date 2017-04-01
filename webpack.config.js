var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: path.join(__dirname, 'app', 'app.js'),
    output: {
        path: path.join(__dirname, 'app', 'public', 'scripts'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,                
                use: ['babel-loader']            
            }
        ]
    },
    externals: {
        fs: '{}',
        tls: '{}',
        net: '{}',
        console: '{}'
    }
};