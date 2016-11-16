var gulp = require("gulp"),
	server = require('gulp-express');
 
gulp.task('server', function () {
    server.run(['builds/development/app.js']);

    gulp.watch(['builds/development/**'], server.notify);
});
