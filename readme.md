# gulp-typescript

a *real* typescript gulp plugin module.

## why i made this plugin

> i'm pretty sure this is how you use gulp...

## example

``` javascript
// npm install --save-dev gulp
const gulp = require('gulp')

// npm install --save-dev Announcement/gulp-typescript
const typescript = require('gulp-typescript')

let source
let configuration
let destination

source = 'source/**/*.ts'
destination = 'library'

configuration = {}

configuration.target = "esnext"
configuration.module = "commonjs"


let ts = typescript(configuration)

gulp.task('script', () =>
    gulp.src(source)
    .pipe(typescript(configuration))
    .pipe(gulp.dest(destination)))
```
