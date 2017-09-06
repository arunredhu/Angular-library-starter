var gulp = require('gulp');
var inlineResources = require('./inline-resources');
var gulpClean = require('gulp-clean');
var sass = require('gulp-sass');
var ngc = require('gulp-ngc');
var ext_replace = require('gulp-ext-replace');

var srcDir = './src/';
var distDir = './dist/';
var tempDir = './.temp/';

/**
 * Getting the relative paths for the different directories
 */
function getPaths(dirName) {
    var paths = {
        srcDir: dirName,
        distDir: dirName,
        css: dirName + '**/*.css',
        scss: dirName + '**/*.scss',
        html: dirName + '**/*.html'
    }

    return paths;
}

// temp paths
var tempPaths = getPaths(tempDir);

/**
 * Inline the resources like html, css, scss
 */
function inlineResource() {
    return inlineResources(tempDir);
}

/**
 * rename the css files to sass
 */
function renameFiles() {
    return gulp.src(tempPaths.css)
        .pipe(ext_replace('.scss', '.css'))
        .pipe(gulp.dest(tempPaths.srcDir));
}

/**
 * compile the sass file to css
 */
function compileSass() {
    return gulp.src(tempPaths.scss)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(tempPaths.srcDir));;
}

/**
 * copy the package.json file to the dist folder
 */
function copyPackageFile() {
    console.log('copy package file')
    return gulp.src('./package.json')
        .pipe(gulp.dest(distDir)).on('end', cleanTemp);
}

/**
 * clean the dist folder
 */
function cleanBuild() {
    return gulp.src('./dist', { read: false })
        .pipe(gulpClean({ force: true }));
}

/**
 * clean the .temp folder
 */
function cleanTemp() {
    return gulp.src(tempDir)
        .pipe(gulpClean({ force: true }));
}

/**
 * ngc compilation using gulp
 */
function ngcCompile() {
    return ngc('./tsconfig.aot.json');
}

/**
 * copy the src directory to temp directory
 */
function copyToTemp() {
    return gulp.src('./src/**/*')
        .pipe(gulp.dest('./.temp/src/'));
}


// sequence for the task execution is ['clean:build', 'copy:temp', 'sass', 'rename:sass', 'inline:resources', 'ngc', 'copy:package.json', 'clean:temp']

gulp.task('clean:build', cleanBuild);

gulp.task('clean:temp', ['copy:package.json'], cleanTemp);

gulp.task('copy:temp', ['clean:build'], copyToTemp);

gulp.task('copy:package.json', ['ngc'], copyPackageFile);

gulp.task('sass', ['copy:temp'], compileSass);

gulp.task('rename:sass', ['sass'], renameFiles);

gulp.task('inline:resources', ['rename:sass'], inlineResource);

gulp.task('ngc', ['inline:resources'], ngcCompile);

gulp.task('default', ['clean:temp']);

