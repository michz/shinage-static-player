const { src, dest, series, parallel } = require('gulp');
const environments = require('gulp-environments');
const inlinesource = require('gulp-inline-source');

//var development = environments.development;
var production = environments.production;


function html() {
    var inlineOptions = {
        compress: false
    };

    if (production()) {
        inlineOptions.compress = true;
    }

    return src('./player.html')
        .pipe(inlinesource(inlineOptions))
        .pipe(dest('./dist'));
}

exports.build = parallel(html);
exports.default = exports.build;
