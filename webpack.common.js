const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/player.js',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'player.html',
            template: 'src/player.html',
        }),
    ],
    output: {
        filename: 'player.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
