var gulp = require('gulp');

var browserify = require('browserify');
//part of browserify converts jsx to js
var reactify = require('reactify');
/*Basically you can say that vinyl-source-stream 
convert the readable stream you get from browserify 
into a vinyl stream that is what gulp is expecting to get.
A vinyl stream is a Virtual file format, and it 
is fundamental for Gulp. Thanks to this vinyl 
streams Gulp doesn't need to write a temporal 
file between different transformations. And this
is one of the main advantages it have over Grunt.*/
var source = require('vinyl-source-stream');


var paths = {
  app: ['./server/client/src/app.jsx'],
  js: ['./server/client/src/**/*.*']
};

gulp.task('browserify', function () {
  //browserify the bundle to js
  browserify(paths.app)
  .transform(reactify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./server/client/build/'));
});

//re-run browserify when any js files in src change
gulp.task('watch', function () {
  gulp.watch(paths.js, ['browserify']);
});

//default task called when gulp run from cli
gulp.task('default', ['watch', 'browserify']);