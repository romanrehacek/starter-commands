var gulp        = require('gulp');
var less        = require('gulp-less');
var rename      = require("gulp-rename");
var cleancss    = require('gulp-clean-css');
var uglify      = require('gulp-uglify');
var combiner    = require('stream-combiner2');
var ftp         = require( 'vinyl-ftp' );

var path = '[enter_path]'; // etc. ./wp-content/themes/name/ OR ./

var paths = {
    less:   [path + 'css/**/*.less'],
    js:     [path + 'js/**/*.js', 
             '!' + path + 'js/vendor/**/*.js',
             '!' + path + 'js/**/*.min.js']
};

// FTP connection login info
var conn = ftp.create( {
		host:     '',
		user:     '',
		password: '',
		parallel: 10
	} );
var remote_base_dir = './www/';

gulp.task('default', function() {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.js, ['compressjs']);
});

gulp.task('watch-ftp', function() {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.js, ['compressjs']);
  
  gulp.watch([path + '**', path + '!node_modules{,/**}', path + '!package.json', path + '!gulpfile.js'])
    .on('change', function(event) {
      console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);
      return gulp.src([event.path], {buffer:false, base: './'})
		    .pipe( conn.dest( remote_base_dir ) );
    });
});


gulp.task('less', function() {
  var combined = combiner.obj([
        gulp.src(paths.less),
        less(),
        gulp.dest(path + 'css'),
        cleancss({'keepSpecialComments': 0}),
        rename({
            suffix: '.min',
        }),
        gulp.dest(path + 'css')
      ]);

  // any errors in the above streams will get caught
  // by this listener, instead of being thrown:
  combined.on('error', console.error.bind(console));

  return combined;
});


gulp.task('compressjs', function() {
  var combined = combiner.obj([
        gulp.src(paths.js),
        uglify(),
        rename({
          suffix: '.min'
        }),
        gulp.dest(path + 'js')
      ]);

  // any errors in the above streams will get caught
  // by this listener, instead of being thrown:
  combined.on('error', console.error.bind(console));

  return combined;
});
