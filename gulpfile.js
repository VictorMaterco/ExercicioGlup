// importação do gulp
const gulp = require('gulp');
//importação gulp-sass
const sass = require('gulp-sass')(require('sass'));
//importação sourcemaps.(serve para aparecer no navegador o endereço css certo)
const sourcemaps = require('gulp-sourcemaps');
//importação gulp uglify(comprimir JS)
const uglify = require('gulp-uglify');
// importação gulp obfuscate(codificar js para dificultar visualização)
const obfuscate = require('gulp-obfuscate');
//importação gulp imagemin (comprimir imagem)
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

//função para comprimir java
function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'));
}

//função para compilhar Sass com gulp (outputStyly compressor de css)
function compilaSass() {
    return gulp.src('./source/style/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/style'));
}



exports.default = function(){
    gulp.watch('./source/style/*.scss', {ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeImagens));
}
