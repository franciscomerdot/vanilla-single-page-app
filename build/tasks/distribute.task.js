const rollup = require('rollup'),
      rollupTypescript = require('rollup-plugin-typescript2'),
      rollupHtml = require('rollup-plugin-html'),
      os = require('os')

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
                        gulp.src(['./src/app/vendor/**/*'])
                            .pipe(gulp.dest('./dist/vendor'))
                     );
    }
}