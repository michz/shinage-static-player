const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: './src/js/player.js',
    output: {
        filename: 'player.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
