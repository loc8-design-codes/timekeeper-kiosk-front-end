// 1. LIBRARIES
// - - - - - - - - - - - - - - - - - - - - - - 

var gulp 		= require('gulp'), 
    sass 		= require('gulp-ruby-sass') ,
    notify 		= require("gulp-notify") ,
    bower 		= require('gulp-bower'),
    webserver   = require('gulp-webserver');

// 2. VARIABLES
// - - - - - - - - - - - - - - - - - - - - - - 

var config = {
     sassPath: './client/assets/scss',
     bowerDir: './bower_components' 
}

// 3. TASK
// - - - - - - - - - - - - - - - - - - - - - - 

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./build/assets/fonts')); 
});

gulp.task('css', function() { 
    return gulp.src(config.sassPath + '/app.scss')
         .pipe(sass({
             style: 'expanded',
             loadPath: [
                 './client/assets/scss',
                 config.bowerDir + '/bootstrap/scss',
                 config.bowerDir + '/fontawesome/scss',
             ]
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
         .pipe(gulp.dest('./build/assets/css')); 
});

 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});

gulp.task('webserver', function() {
    gulp.src('build')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});


  gulp.task('default', ['bower', 'icons', 'css', 'watch' , 'webserver']);
