let project_folder = "dist";
let sourse_folder = "src";

let fs = require('fs');

let path = {
	build: {
		html: project_folder + "/",
		css: project_folder + "/css/",
		fonts: project_folder + "/fonts/",
		img: project_folder + "/img/",
		js: project_folder + "/js/",
		files: `${project_folder}/files/`
	},
	src: {
		html: [sourse_folder + "/*.html", "!" + sourse_folder + "/_*.html"],
		css: sourse_folder + "/scss/**/*.scss",
		fonts: sourse_folder + "/fonts/*.ttf",
		img: sourse_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		js: sourse_folder + "/js/*.js",
		files: `${sourse_folder}/files/**/*.*`
	},
	watch: {
		html: sourse_folder + "/**/*.html",
		css: sourse_folder + "/scss/**/*.scss",
		img: sourse_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		js: sourse_folder + "/js/**/*.js",
		files: `${sourse_folder}/files/**/*.*`
	},
	clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require("browser-sync").create(),
	fileinclude = require("gulp-file-include"),
	del = require("del"),
	autoprefixer = require("gulp-autoprefixer"),
	groupmedia = require("gulp-group-css-media-queries"),
	clean_css = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	scss = require('gulp-sass')(require('sass')),
	imagemin = require("gulp-imagemin"),
	webp = require("gulp-webp"),
	webphtml = require("gulp-webp-html"),
	ttf2woff2 = require("gulp-ttf2woff2"),
	ttf2woff = require("gulp-ttf2woff"),
	fonter = require("gulp-fonter"),
	uglify = require("gulp-uglify-es").default;

// scss({ outputStyle: 'expanded' }).on('error', scss.logError)
function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: "./" + project_folder + "/"
		},
		port: 3000,
		notify: false
	})
}

const copy = () => {
	return gulp.src(path.src.files)
		.pipe(gulp.dest(path.build.files))
}

function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		// .pipe(webphtml())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function fonts() {
	src(path.src.fonts)
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts))
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts))
}

function css() {
	return src(path.src.css)
		.pipe(
			scss({
				outputStyle: "expanded"
			})
		)
		.pipe(groupmedia())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 versions"],
				cascade: true
			})
		)
		// .pipe(dest(path.build.css))
		// .pipe(clean_css())
		// .pipe(
		// 	rename({
		// 		extname: ".min.css"
		// 	})
		// )
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(uglify())
		.pipe(
			rename({
				extname: ".min.js"
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function image() {
	return src(path.src.img)
		// .pipe(
		// 	webp({
		// 		quality: 70
		// 	})
		// )
		.pipe(dest(path.build.img))
		.pipe(src(path.src.img))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 5 // 0 - 7
			})
		)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

gulp.task('otf2ttf', function () {
	return src([sourse_folder + '/fonts/*.otf'])
		.pipe(
			fonter({
				formats: ['ttf']
			})
		)
		.pipe(dest(sourse_folder + '/fonts/'));
});

// function fontsStyle(params) {
// 	let file_content = fs.readFileSync(sourse_folder + '/scss/fonts.scss');
// 	if (file_content == '') {
// 		fs.writeFile(sourse_folder + '/scss/fonts.scss', '', cb);
// 		return fs.readdir(path.build.fonts, function (err, items) {
// 			if (items) {
// 				let c_fontname;
// 				for (let i = 0; i < items.length; i++) {
// 					let fontname = items[i].split('.');
// 					fontname = fontname[0];
// 					if (c_fontname != fontname) {
// 						fs.appendFile(sourse_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
// 					}
// 					c_fontname = fontname;
// 				}
// 			}
// 		})
// 	}
// }


function cb() {

}

function watchFile(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], image);
	gulp.watch([path.watch.files], copy);
}

function clean(params) {
	return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(html, js, css, fonts, image, copy));
let watch = gulp.parallel(build, watchFile, browserSync);

exports.image = image;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
exports.copy = copy;