var gulp        = require('gulp');
var less        = require('gulp-less');
var rename      = require("gulp-rename");
var cleancss    = require('gulp-clean-css');
var uglify      = require('gulp-uglify');
var combiner    = require('stream-combiner2');
var watch       = require('gulp-watch');

var path = '[enter_path]'; // etc. ./wp-content/themes/name/ OR ./

var paths = {
    less:   [path + 'css/**/*.less'],
    js:     [path + 'js/**/*.js', 
             '!' + path + 'js/vendor/**/*.js',
             '!' + path + 'js/**/*.min.js']
};

gulp.task('default', function() {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.js, ['compressjs']);
});

gulp.task('watch-ftp', function() {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.js, ['compressjs']);
  
  return watch([path + '**', path + '!node_modules{,/**}', path + '!package.json', path + '!gulpfile.js', path + '!.git{,/**}'], function(datos){
      //console.log('Kind of event: ' + datos.event);
      for(var i=0; i<datos.history.length; i++){
          if (datos.history[i].search('.git') > 0) {
            continue;
          }
          var archivoLocal = datos.history[i];
          var archivoRel = datos.history[i].replace(datos.cwd,'');
          //console.log(archivoRel)
          //console.log(JSON.stringify(datos, null, 4))
          var archivoRemoto = '/www' + archivoRel;
          var valid = true;
          if(archivoLocal.indexOf('/.') >= 0)
            valid=false; //ignore .git, .ssh folders and the like
          //console.log('File [' +(i+1) + '] ' + (valid?'valid':'INVALID') + ' localFile: ' + archivoLocal + ', relativeFile: ' + archivoRel + ', remoteFile: ' + archivoRemoto);
          console.log('File [' +(i+1) + '] - ' + datos.event + ' - ' + (valid?'valid':'INVALID') + ' - ' + archivoLocal);
          var comando = "lftp";
          var comando_params = "-d -c \"open -u login,pass sftp://host; put " + archivoLocal + " -o " + archivoRemoto + "\" ";
          if(valid){
              //console.log('Performing in shell: ' + comando + ' ' + comando_params);
              var exec = require('child_process').exec;
              exec(comando + ' ' + comando_params, (error, stdout, stderr) => {
                  if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                  }
                  //console.log(`stdout: ${stdout}`);
                  //console.log(`stderr: ${stderr}`);
                  var success = stderr.search("Transfer complete");
                  
                  if (success < 0) {
                    success = stderr.search("Success");
                  }
                  
                  var login = stderr.search("Login incorrect");
                  
                  if (success > 0) {
                    console.log('\033[42mNahrate\033[m - ' + archivoLocal);
                  }
                  
                  if (login > 0) {
                    console.log('\033[41mNepripojene na FTP!\033[m');
                  }
              });
          }
      }//end for
  });//end watch
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

gulp.task( 'deploy', function () {
 
	var globs = [
		path + '**',
		'!' + path + 'img/**',
		'!' + path + 'fonts/**'
	];
 
	return gulp.src( globs, { base: '.', buffer: false } )
		.pipe( conn.dest( remote_base_dir ) );
 
} );
