gulp = require 'gulp'
coffee = require 'gulp-coffee'
plumber = require 'gulp-plumber'
order = require 'gulp-order'
concat = require 'gulp-concat'

BASE_DIR = 'client/'
STATIC_DIR = 'recipes/static/'

# Error handler
onError = (error) ->
    console.log(error)
    @emit('end')

gulp.task 'clean', (done) ->
    del(STATIC_DIR, done)

# Convert .coffee files into single app.js file
gulp.task 'coffee', ->
    gulp.src("#{BASE_DIR}**/*.coffee")
        .pipe(plumber({errorHandler: onError}))
        .pipe(coffee({bare: true}))
        .pipe(order(["**/*.js"]))
        .pipe(concat('app.js'))
        .pipe(gulp.dest("#{STATIC_DIR}js/"))


gulp.task 'test-coffee', ->
    gulp.src("#{BASE_DIR}test.coffee")
        .pipe(plumber({errorHandler: onError}))
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest("#{STATIC_DIR}js/"))

gulp.task 'html', ->
    gulp.src("#{BASE_DIR}**/*.html")
        .pipe(gulp.dest("#{STATIC_DIR}"))

gulp.task 'watch', ->
    gulp.watch("#{BASE_DIR}**/*.coffee", ['coffee'])
    gulp.watch("#{BASE_DIR}test.coffee", ['test-coffee'])
    gulp.watch("settings.js", 'settings')
    gulp.watch("#{BASE_DIR}**/*.html", ['html'])
