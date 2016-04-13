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

## Download gulpfile.js

```
wget "https://raw.githubusercontent.com/romanrehacek/starter-commands/master/gulpfile.js"
```

## WP-CLI
*Install WP-CLI*
```
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar;
chmod +x wp-cli.phar; 
sudo mv wp-cli.phar /usr/local/bin/wp;

```

*Download wp-config local file*
```
wget "https://raw.githubusercontent.com/romanrehacek/starter-commands/master/wp-config-local.php"
```

*Download modified wp-config file*
```
wget "https://raw.githubusercontent.com/romanrehacek/starter-commands/master/wp-config.php"
```

*Clean dummy data*
```
wp post delete $(wp post list --post_type='page' --format=ids) --force;
wp post delete $(wp post list --post_type='post' --format=ids) --force;
wp comment delete $(wp comment list --format=ids);
wp plugin delete akismet;
wp plugin delete hello;
wp theme delete twentyfourteen;
wp theme delete twentyfifteen;
```

*Download and edit default theme*
*Replace [theme_name] with name, etc. "example"*
```
wget "https://github.com/romanrehacek/default-wp-theme/archive/master.zip"
unzip master.zip -d wp-content/themes/
rm master.zip
mv wp-content/themes/default-wp-theme-master wp-content/themes/theme_name
sed -i 's/example\.com/theme_name\.sk/g' wp-content/themes/theme_name/style.css
wp theme activate theme_name
wp theme delete twentysixteen
```

## Add git
```
cd wp-content/theme/theme_name/
wget "https://raw.githubusercontent.com/romanrehacek/starter-commands/master/.gitignore"
git init
git remote add origin git_url
git branch --set-upstream-to=origin/master master
git add .
git commit -m "Add default theme"
git push
```

## edit gulpfile.js
*Replace [theme_name] with name of theme dir*
```
cd ../../../
sed -i 's/theme_name/[theme_name]/g' gulpfile.js
```
