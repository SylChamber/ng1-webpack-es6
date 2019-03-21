const path = require('path');
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'app.module'),
    watch: false,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules: [{
            test: /.(html)$/,
            use: 'html-loader'
        }]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx']
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join('/dist/'),
        inline: true,
        host: '0.0.0.0',
        port: 8080,
    }
};