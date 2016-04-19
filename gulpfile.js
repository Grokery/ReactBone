var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var exec = require('child_process').exec;

var buildpath = "dist";

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['build']);
    gulp.watch('scss/*.scss', ['build']);
    gulp.watch('views/*.html', ['build']);
    gulp.watch('img/*', ['build']);
});

gulp.task('clean', function () {
    return gulp.src([
        buildpath+'/*'
    ], {read: false})
        .pipe(clean());
});

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true }));
});

gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(buildpath+'/css'))
});

gulp.task('scripts', function() {
    return gulp.src([
        'js/!(app)*.js',
        'js/app.js'
    ])
        .pipe(concat('all.js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildpath+'/js'));
});

gulp.task('copy', function (cb) {
    gulp.src('views/*.html')
        .pipe(gulp.dest(buildpath+''));
    gulp.src(['img/*.*'])
        .pipe(gulp.dest(buildpath+'/img/'));
    gulp.src(['libs/*.*'])
        .pipe(gulp.dest(buildpath+'/libs/'));
});

gulp.task('build', ['sass', 'scripts', 'copy']);

gulp.task('deploy', function (cb) {
    exec('aws s3 sync dist/ s3://dev.grokery.io/ --delete --profile grokery',
        function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
});

gulp.task('prod-deploy', function (cb) {
    exec('aws s3 sync dist/ s3://grokery.io/ --delete --profile grokery',
        function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
});
