const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.template.html'),
            inject: 'body'
        })
    ],
    resolve: {
        extensions: ['.json', '.js', '.jsx']
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join('/dist/'),
        inline: true,
        port: 8080,
    }
};