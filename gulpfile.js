var gulp        	= require('gulp');
var less        	= require('gulp-less');
var rename      	= require("gulp-rename");
var cleancss    	= require('gulp-clean-css');
var uglify      	= require('gulp-uglify');
var combiner    	= require('stream-combiner2');
var watch       	= require('gulp-watch');
var gutil       	= require('gulp-util');
var prettyHrtime 	= require('pretty-hrtime');

var path = '[enter_path]'; // etc. ./wp-content/themes/name/ OR ./

var ftp = {
	dev: {
		host: "",		// example.com
		login: "",
		pass: "",
		path: "",		// /www
		protocol: "ftp",	// ftp OR sftp
		port: "21"  // ssh 2121
	},
	production: {
		host: "",	// example.com
		login: "",
		pass: "",
		path: "/www",	// /www
		protocol: "ftp",	// ftp OR sftp
		port: "21"  // ssh 2121
	}
};

var connect_to = ftp.dev;

var paths = {
    less:   [path + 'css/**/*.less'],
    js:     [path + 'js/**/*.js', 
    				 '!' + path + 'js/plugins/**/*.js',
             '!' + path + 'js/vendor/**/*.js',
             '!' + path + 'js/**/*.min.js']
};

gulp.task('default', function() {
  gulp.watch(paths.less, function(event){
    less_function(event.path);
  });
  gulp.watch(paths.js, function(event){
    compressjs_function(event.path);
  });
});

gulp.task('watch-ftp', function() {
  gulp.watch(paths.less, function(event){
    less_function(event.path);
  });
  gulp.watch(paths.js, function(event){
    compressjs_function(event.path);
  });
  
  return watch([path + '**', path + '!node_modules{,/**}', path + '!package.json', path + '!gulpfile.js', path + '!.git{,/**}'], function(datos){
      //console.log('Kind of event: ' + datos.event);
      var spawn = require('child_process').spawn;
      for(var i=0; i<datos.history.length; i++){
        (function(i){
          if (datos.history[i].search('.git') > 0) {
            return;
          }
          var archivoLocal = datos.history[i];
          var archivoRel = datos.history[i].replace(datos.cwd,'');
          //console.log(archivoRel)
          //console.log(JSON.stringify(datos, null, 4))
          var archivoRemoto = connect_to.path + archivoRel;
          var valid = true;
          if(archivoLocal.indexOf('/.') >= 0) {
            valid=false; //ignore .git, .ssh folders and the like
          }
          
          var disable_ssl = "set ftp:ssl-allow no; ";
          var opt = "set net:max-retries 2;set net:reconnect-interval-base 1;set net:reconnect-interval-multiplier 1; ";
          if (connect_to.protocol == "sftp") {
          	disable_ssl = "";
          }
          
          var comando = disable_ssl + opt + "open -u " + connect_to.login + "," + connect_to.pass + " " + connect_to.protocol + "://" + connect_to.host + " -p " + connect_to.port + "; put " + archivoLocal + " -o " + archivoRemoto;
          if(valid){
            
            var exec = require('child_process').exec;
            var child = exec('lftp -c "' + comando + '"');
            
            // Listen for any response:
            child.stdout.on('data', function (data) {
                console.log(child.pid, data);
            });
        
            // Listen for any errors:
            child.stderr.on('data', function (data) {
                console.log(child.pid, data);
            }); 
        
            // Listen if the process closed
            child.on('close', function(exit_code) {
                if (exit_code == 0) {
                  console.log("\x1b[42mUpload complete\x1b[0m - " + archivoLocal);
                } else {
                  console.log("\x1b[41mError\x1b[0m");
                }
            });
            
            /*var command = spawn('lftp', ['-c', comando],{ stdio: ['inherit', 'inherit', 'inherit'] });
            
            command.on('close', (code) => {
              if (code == 0) {
                console.log("\x1b[42mUpload complete\x1b[0m - " + archivoLocal);
              } else {
                console.log("\x1b[41mError\x1b[0m");
              }
            });*/
          }
        })(i);
      }//end for
  });//end watch
});


function less_function(files) {
  var start = process.hrtime();
  gutil.log('Starting \'\x1b[36mless\x1b[0m\' - ' + get_file_path(files));
  
  var combined = combiner.obj([
        gulp.src(files),
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
  
  combined.on('finish', log('Finished \'\x1b[36mless\x1b[0m\' after \x1b[35m' + prettyHrtime(process.hrtime(start)) + '\x1b[0m - ' + get_file_path(files)));
  return combined;
};

function compressjs_function(files) {
  var start = process.hrtime();
  gutil.log('Starting \'\x1b[36mcompressjs\x1b[0m\' - ' + get_file_path(files));
  
  var combined = combiner.obj([
        gulp.src(files),
        uglify(),
        rename({
          suffix: '.min'
        }),
        gulp.dest(path + 'js')
      ]);

  // any errors in the above streams will get caught
  // by this listener, instead of being thrown:
  combined.on('error', console.error.bind(console));
  combined.on('finish', log('Finished \'\x1b[36mcompressjs\x1b[0m\' after \x1b[35m' + prettyHrtime(process.hrtime(start)) + '\x1b[0m - ' + get_file_path(files)));
  return combined;
};

function log(message) {
    return function() {
        gutil.log(message + "\n");
    }
}

function get_file_path(file) {
  return file.replace('/home/ubuntu/workspace/'+path.replace('./', ''),'');
}

gulp.task('download_full', function() {
  download("/");
});

gulp.task('download_wp_content', function() {
  download("/wp-content");
});

gulp.task('download_themes', function() {
  download("/wp-content/themes");
});

gulp.task('download_uploads', function() {
  download("/wp-content/uploads");
});

gulp.task('download_plugins', function() {
  download("/wp-content/plugins");
});

gulp.task('upload_full', function() {
  upload("/");
});

gulp.task('upload_wp_content', function() {
  upload("/wp-content");
});

gulp.task('upload_themes', function() {
  upload("/wp-content/themes");
});

gulp.task('upload_uploads', function() {
  upload("/wp-content/uploads");
});

gulp.task('upload_plugins', function() {
  upload("/wp-content/plugins");
});

function download(path) {
  var error, stdout, stderr;
	var disable_ssl = "set ftp:ssl-allow no; ";
  if (connect_to.protocol == "sftp") {
  	disable_ssl = "";
  }
  var comando = disable_ssl + "open -u " + connect_to.login + "," + connect_to.pass + " " + connect_to.protocol + "://" + connect_to.host + " -p " + connect_to.port + "; mirror --parallel=10 " + connect_to.path + path + "/ /home/ubuntu/workspace" + path;
  
  const spawn = require('child_process').spawn;
  const command = spawn('lftp', ['-c', comando],{ stdio: ['inherit', 'inherit', 'inherit'] });
  
  command.on('close', (code) => {
    if (code == 0) {
      console.log("\x1b[42mDownload complete\x1b[0m");
    } else {
      console.log("\x1b[41mError\x1b[0m");
    }
  });
}

function upload(path) {
  var error, stdout, stderr;
	var disable_ssl = "set ftp:ssl-allow no; ";
  if (connect_to.protocol == "sftp") {
  	disable_ssl = "";
  }
  var comando = disable_ssl + "open -u " + connect_to.login + "," + connect_to.pass + " " + connect_to.protocol + "://" + connect_to.host + " -p " + connect_to.port + "; mirror --parallel=10 -R --exclude \"(.c9|node_modules|gulpfile.js|package.json|start.sh)+\" /home/ubuntu/workspace" + path + "/ " + connect_to.path + path;
  
  const spawn = require('child_process').spawn;
  const command = spawn('lftp', ['-c', comando],{ stdio: ['inherit', 'inherit', 'inherit'] });
  
  command.on('close', (code) => {
    if (code == 0) {
      console.log("\x1b[42mUpload complete\x1b[0m");
    } else {
      console.log("\x1b[41mError\x1b[0m");
    }
  });
}
