import * as gulp from 'gulp';
const { src, dest, series, watch } = gulp;

import concat from 'gulp-concat';
import htmlmin from 'gulp-htmlmin';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import svgSprite from 'gulp-svg-sprite';
import imagemin from 'gulp-imagemin';
import terser from 'gulp-terser';
import babel from 'gulp-babel';
import notify from 'gulp-notify';
import sourcemaps from 'gulp-sourcemaps';
import { deleteAsync } from 'del';
import webp from 'gulp-webp';
import htmlImport from 'gulp-html-imports';

import browserSync from 'browser-sync';
const bs = browserSync.create();

const styles = () => {
    return src(['src/assets/css/**/*.css', 'node_modules/swiper/swiper-bundle.min.css'])
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions']
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/assets/css'))
        .pipe(bs.stream());
};

const htmlImportHTML = () => {
    return src('src/*.html')
        .pipe(htmlImport({
            componentsPath: 'src/components/'
        }))
        .pipe(dest('dist'))
        .pipe(bs.stream());
};

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist'))
        .pipe(bs.stream());
};

const svgSprites = () => {
    return src('src/assets/img/svg/**/*.svg', { encoding: false })
        .pipe(svgSprite({
            mode: {
                symbol: true,
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest('dist/assets/img'));
};

const scripts = () => {
    return src(['src/assets/js/main.js', 'src/assets/js/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('main.js'))
        .pipe(terser().on('error', notify.onError))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/assets/js'))
        .pipe(bs.stream());
};

const resources = () => {
    return src('src/assets/resources/**', { encoding: false })
        .pipe(dest('dist/assets/resources'))
        .pipe(bs.stream());
};

const clean = () => {
    return deleteAsync(['dist/*/']);
};

const watchFiles = () => {
    bs.init({
        server: {
            baseDir: 'dist'
        },
        open: false,
        notify: false
    });
};

const images = () => {
    return src([
        'src/assets/img/**/*.jpg',
        'src/assets/img/**/*.png',
        'src/assets/img/**/*.svg',
        'src/assets/img/**/*.jpeg'
    ], { encoding: false })
        .pipe(imagemin())
        .pipe(dest('dist/assets/img'))
        .pipe(webp())
        .pipe(dest('dist/assets/img'))
        .pipe(bs.stream());
};

const prod = () => {
    return src('dist/**')
        .pipe(dest('production'))
        .pipe(bs.stream());
};

// watch('src/**/*.html', htmlMinify)
watch('src/**/*.html', htmlImportHTML)
watch('src/assets/css/**/*.css', styles)
watch('src/assets/js/**/*.js', scripts)
watch('src/assets/resources/**', resources)
watch('src/assets/img/**/*.png', images)
watch('src/assets/img/**/*.jpg', images)
watch('src/assets/img/**/*.svg', images)
watch('src/assets/img/svg/**/*.svg', svgSprites)

export const stylesTask = styles;
export const scriptsTask = scripts;
export const cleanTask = clean;
export const imagesTask = images;
export const resourcesTask = resources;
export const htmlMinifyTask = htmlMinify;
export const svgSpritesTask = svgSprites;
export const htmlImportHTMLTask = htmlImportHTML;
export const watchFilesTask = watchFiles;

export const defaultTask = series(
    cleanTask,
    svgSpritesTask,
    htmlImportHTMLTask,
    // htmlMinifyTask,
    stylesTask,
    imagesTask,
    scriptsTask,
    resourcesTask,
    watchFilesTask
);

