const rollup = require('rollup'),
      rollupTypescript = require('rollup-plugin-typescript2'),
      rollupHtml = require('rollup-plugin-html'),
      gulpConcat = require('gulp-concat'),
      os = require('os');

const rollupTypescriptOptions = {
    cacheRoot: os.tmpdir(),
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
        compilerOptions: {
            declaration: true,
            declarationDir: './dist/definitions'
        },
        include: ['./src/app/**/*.ts']
    }
}

const rollupOptions = {
    input: './src/app/entry.ts',
    plugins: [
        rollupTypescript(rollupTypescriptOptions),
        rollupHtml({ include: '**/*.html' })
    ],
    external: [
    ]
}

module.exports = function configureGulp(gulp) {

    gulp.task('distribute', getDistributePipe);
    gulp.task('distribute-cd', ['integrate'], getDistributePipe);

    function getDistributePipe() {
        return rollup.rollup(rollupOptions)
                     .then(bundle => {
                        return bundle.write({               
                            file: './dist/app.js',
                            format: 'amd'
                        })
                     }).then(
                        gulp.src(['./src/app/index.html'])
                            .pipe(gulp.dest('./dist/'))
                     ).then(
                        gulp.src(['./src/app/vendor/**/*.js'])
                            .pipe(gulpConcat({ path: 'vendor.js' }))
                            .pipe(gulp.dest('./dist/'))
                     ).then(
                        gulp.src(['./src/app/styles/**/*.css'])
                            .pipe(gulpConcat({ path: 'styles.css' }))
                            .pipe(gulp.dest('./dist/'))
                     );
    }
}