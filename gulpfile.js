const { series, parallel, dest, src, watch } = require('gulp')
const imagemin = require('gulp-imagemin')
const babel = require('gulp-babel')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()

sass.compiler = require('node-sass')

var paths = {
    raiz: 'docs',
    html: {
      src: 'dev/**/*.pug',
      dest: 'docs/'
    },
    styles: {
      src: 'dev/scss/**/*.scss',
      dest: 'docs/css/'
    },
    scripts: {
      src: 'dev/js/**/*.js',
      dest: 'docs/js/'
    },
    images: {
      src: 'dev/images/**/*',
      dest: 'docs/images/'
    }
};

function server() {
  browserSync.init({
      server: {
          baseDir: paths.raiz
      }
  });
}

function babelJs () {
  return src(paths.scripts.src)
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(dest(paths.scripts.dest))
}

function pugToHtml () {
    return src(paths.html.src)
      .pipe(pug({pretty: true}))
      .pipe(dest(paths.html.dest))
}

function sassToCss () {
  return src(paths.styles.src)
    .pipe(sass())
      .on('error', sass.logError)
    .pipe(dest(paths.styles.dest))
}

function optimizeImg () {
  return src(paths.images.src)
    .pipe(imagemin())
    .pipe(dest(paths.images.dest))
}

function watchFiles () {
  watch(paths.scripts.src, babelJs)
  watch(paths.html.src, pugToHtml)
  watch(paths.styles.src, sassToCss)
  watch(paths.html.dest).on('change', browserSync.reload)
  watch(paths.styles.dest).on('change', browserSync.reload);
}

exports.watch = watchFiles
exports.default = series(optimizeImg, parallel(server, watchFiles))
