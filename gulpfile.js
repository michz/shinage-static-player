const { src, dest, series } = require('gulp');
const webpack = require('webpack-stream');
const environments = require('gulp-environments');
const inlinesource = require('gulp-inline-source');

//var development = environments.development;
var production = environments.production;

exports.buildWebpack = function() {
    return src('src/js/player.js')
        .pipe(webpack({
            ...(require('./webpack.config.js')),
            ...{mode: production() ? 'production' : 'development'},
        }))
        .pipe(dest('dist/'));
}

exports.htmlInline = function() {
    return src('src/player.html')
        .pipe(inlinesource({
            compress: production(),
        }))
        .pipe(dest('dist'));
}

exports.default = series(exports.buildWebpack, exports.htmlInline)
