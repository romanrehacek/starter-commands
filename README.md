# Starter commands

## git commands
*Download from repository*
```
git pull
```

*Show changes*
```
git status
```

*Prepare ALL changed files to commit*
```
git add .
```

*Commit changed files*
```
git commit -m "Message what changed"
```

*Upload to repository*
```
git push
```

## Install Gulp

```
npm init
npm install gulp -g
npm install --save-dev gulp
npm install --save-dev gulp-less gulp-clean-css gulp-uglify gulp-rename stream-combiner2
```

## Create file gulpfile.js

```
var gulp        = require('gulp');
var less        = require('gulp-less');
var rename      = require("gulp-rename");
var cleancss    = require('gulp-clean-css');
var uglify      = require('gulp-uglify');
var combiner    = require('stream-combiner2');

// var path = './wp-content/themes/theme_name/';
var path = './content_dir/themes/theme_name/';

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
```

## WP-CLI
*Install WP-CLI*
```
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp
```

*Install WP*
```
wp core download --locale=en_US
```

*Download wp-config local file*
```
wget "https://raw.githubusercontent.com/romanrehacek/starter-commands/master/wp-config-local.php"
```

*Download modified wp-config file*
```
wget "https://raw.githubusercontent.com/romanrehacek/starter-commands/master/wp-config.php"
```
