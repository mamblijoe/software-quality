const gulp        = require('gulp');
const fileinclude = require('gulp-file-include');
const server = require('browser-sync').create();
const { watch, series } = require('gulp');


// Reload Server
async function reload() {
    server.reload();
}



// Build files html and reload server
async function buildAndReload() {
    await includeHTML();
    reload();
}

async function includeHTML(){
    return gulp.src([
        './src/index.html',
    ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'));
}
exports.includeHTML = includeHTML;

exports.default = async function() {
    // Init serve files from the build folder
    server.init({
        server: {
            baseDir: './'
        }
    });
    // Build and reload at the first time
    buildAndReload();
    // Watch task
    watch(["./src/index.html", './src/partials/*.html'], series(buildAndReload));
};
