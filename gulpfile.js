/* eslint-disable node/no-unpublished-require */
const projectFolder = "public";
const srcFolder = "resources";

const path = {
  build: {
    css: `${projectFolder}/css/`,
    js: `${projectFolder}/scripts/`,
    img: `${projectFolder}/img/`,
  },
  src: {
    css: `${srcFolder}/scss/main.scss`,
    js: `${srcFolder}/js/**/*.js`,
    img: `${srcFolder}/img/**/*.{jpg,png,svg,ico,gif,webp,mp4}`,
  },
  watch: {
    css: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    img: `${srcFolder}/img/**/*.{jpg,png,svg,ico,gif,webp}`,
  },
  clean: `./${projectFolder}/`,
};

const { src, dest } = require("gulp");
const gulp = require("gulp");
// const del = require("del");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const groupMedia = require("gulp-group-css-media-queries");
const cleanCss = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const include = require("gulp-include");
const browsersync = require("browser-sync").create();
// ttf2woff = require("gulp-ttf2woff"),
// ttf2woff2 = require("gulp-ttf2woff2");
// webp = require("gulp-webp"),
// webphtml = require("gulp-webp-html");
// webpcss = require("gulp-webpcss");
// imagemin = require("gulp-imagemin"),

function browserSync() {
  browsersync.init({
    port: 5500,
    proxy: "localhost:3000",
    notify: false,
  });
}

function css() {
  return (
    src(path.src.css)
      .pipe(sourcemaps.init())
      .pipe(
        sass({
          outputStyle: "expanded",
        })
      )
      .pipe(groupMedia())
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 5 versions"],
          cascade: true,
        })
      )
      // .pipe(webpcss())
      .pipe(cleanCss())
      .pipe(sourcemaps.write("."))
      .pipe(dest(path.build.css))
      .pipe(browsersync.stream())
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
      .pipe(browsersync.stream())
  );
}

function js() {
  return (
    src(path.src.js)
      .pipe(
        include({
          includePaths: [`${__dirname}/node_modules`, `${__dirname}/src/js`],
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
      .pipe(browsersync.stream())
  );
}

// function clean() {
//   return del(path.clean);
// }

function watchFiles() {
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

const build = gulp.series(
  // clean,
  // html,
  gulp.parallel(js, css, images)
);
const watch = gulp.parallel(build, watchFiles, browserSync);
exports.images = images;
exports.js = js;
exports.css = css;
exports.build = build;

exports.watch = watch;
exports.default = watch;
