let projectFolder = 'public';
let srcFolder = 'resources';

let path = {
  build: {
    css: projectFolder + '/css/',
    js: projectFolder + '/scripts/',
    img: projectFolder + '/img/',
  },
  src: {
    css: srcFolder + '/scss/main.scss',
    js: srcFolder + '/js/**/*.js',
    img: srcFolder + '/img/**/*.{jpg,png,svg,ico,gif,webp,mp4}',
  },
  watch: {
    css: srcFolder + '/scss/**/*.scss',
    js: srcFolder + '/js/**/*.js',
    img: srcFolder + '/img/**/*.{jpg,png,svg,ico,gif,webp}',
  },
  clean: './' + projectFolder + '/',
};

let { src, dest } = require('gulp'),
  gulp = require('gulp'),
  del = require('del'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  groupMedia = require('gulp-group-css-media-queries'),
  cleanCss = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  include = require('gulp-include');
// ttf2woff = require("gulp-ttf2woff"),
// ttf2woff2 = require("gulp-ttf2woff2");
// webp = require("gulp-webp"),
// webphtml = require("gulp-webp-html");
// webpcss = require("gulp-webpcss");
// imagemin = require("gulp-imagemin"),

function css() {
  return (
    src(path.src.css)
      .pipe(sourcemaps.init())
      .pipe(
        sass({
          outputStyle: 'expanded',
        })
      )
      .pipe(groupMedia())
      .pipe(
        autoprefixer({
          overrideBrowserslist: ['last 5 versions'],
          cascade: true,
        })
      )
      // .pipe(webpcss())
      .pipe(cleanCss())
      .pipe(sourcemaps.write('.'))
      .pipe(dest(path.build.css))
  );
}

function images() {
  return (
    src(path.src.img)
      // .pipe(
      //   webp({
      //     qulaity: 70,
      //   })
      // )
      // .pipe(dest(path.build.img))
      // .pipe(src(path.src.img))
      // .pipe(
      //   imagemin({
      //     progressive: true,
      //     svgoPlugins: [{ removeViewBox: false }],
      //     interlaced: true,
      //     optimizationLevel: 3,
      //   })
      // )
      .pipe(dest(path.build.img))
  );
}

function js() {
  return (
    src(path.src.js)
      .pipe(
        include({
          includePaths: [__dirname + '/node_modules', __dirname + '/src/js'],
        })
      ) //to collect js sections
      //     .pipe(
      //       minify({
      //         ext: {
      //           min: ".js",
      //         },
      //         noSource: true,
      //       })
      //     )
      .pipe(dest(path.build.js))
  );
}

function clean() {
  return del(path.clean);
}

function watchFiles() {
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

let build = gulp.series(
  clean,
  // html,
  gulp.parallel(js, css, images)
);
let watch = gulp.parallel(build, watchFiles);
exports.images = images;
exports.js = js;
exports.css = css;
exports.build = build;

exports.watch = watch;
exports.default = watch;
