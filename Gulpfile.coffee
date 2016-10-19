gulp      = require 'gulp'
gutil     = require 'gulp-util'
coffee    = require 'gulp-coffee'
bower     = require 'bower'
concat    = require 'gulp-concat'
sass      = require 'gulp-sass'
minifyCss = require 'gulp-minify-css'
rename    = require 'gulp-rename'
sh        = require 'shelljs'
paths     =
  sass:   [ './scss/**/*.scss' ]
  coffee: [ './www/coffee/**/*.coffee' ]


gulp.task 'default', [ 'sass', 'coffee' ]


gulp.task 'sass', (done) ->
  gulp.src './scss/ionic.app.scss'
  .pipe sass()
  .on 'error', sass.logError
  .pipe gulp.dest './www/css/'
  .pipe minifyCss(keepSpecialComments: 0)
  .pipe rename extname: '.min.css'
  .pipe gulp.dest './www/css/'
  .on 'end', done
  return


gulp.task 'coffee', (done) ->
  gulp.src paths.coffee
  .pipe coffee bare: true
  .on 'error', gutil.log
  .pipe gulp.dest './www/js'
  .on 'end', done
  return


gulp.task 'watch', ->
  gulp.watch paths.sass, [ 'sass' ]
  gulp.watch paths.coffee, [ 'coffee' ]
  return


gulp.task 'install', [ 'git-check' ], ->
  bower.commands.install()
  .on 'log', (data) ->
    gutil.log 'bower', gutil.colors.cyan(data.id), data.message
    return


gulp.task 'git-check', (done) ->
  if !sh.which('git')
    console.log '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    process.exit 1
  done()
  return
