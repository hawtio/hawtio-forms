var gulp = require('gulp'),
    eventStream = require('event-stream'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    del = require('del'),
    fs = require('fs'),
    path = require('path'),
    urljoin = require('url-join'),
    argv = require('yargs').argv,
    s = require('underscore.string');

var plugins = gulpLoadPlugins({});

var config = {
  ts: ['plugins/**/*.ts'],
  testTs: ['test-plugins/**/*.ts'],
  less: ['plugins/**/*.less'],
  templates: ['plugins/**/*.html'],
  testTemplates: ['test-plugins/**/*.html'],
  templateModule: 'hawtio-forms-templates',
  testTemplateModule: 'hawtio-forms-test-templates',
  dist: argv.out || 'dist/',
  testDist: 'test-dist/',
  js: 'hawtio-forms.js',
  testJs: 'hawtio-forms-test.js',
  css: 'hawtio-forms.css',
  tsProject: plugins.typescript.createProject('tsconfig.json'),
  testTsProject: plugins.typescript.createProject('test-tsconfig.json'),
  vendorJs: 'vendor/*.js'
};

gulp.task('clean-defs', function() {
  return del(config.dist + '*.d.ts');
});

gulp.task('example-tsc', ['tsc'], function() {
  return gulp.src(config.testTs)
    .pipe(config.testTsProject())
    .js
    .pipe(gulp.dest('.'));
});

gulp.task('example-template', ['example-tsc'], function() {
  return gulp.src(config.testTemplates)
    .pipe(plugins.angularTemplatecache({
      filename: 'test-templates.js',
      root: 'test-plugins/',
      standalone: true,
      module: config.testTemplateModule,
      templateFooter: '}]); hawtioPluginLoader.addModule("' + config.testTemplateModule + '");'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('example-concat', ['example-template'], function() {
  return gulp.src(['test-compiled.js', 'test-templates.js'])
    .pipe(plugins.concat(config.testJs))
    .pipe(gulp.dest(config.testDist));
});

gulp.task('example-clean', ['example-concat'], function() {
  return del(['test-templates.js', 'test-compiled.js']);
});


gulp.task('tsc', ['clean-defs'], function() {
  var tsResult = gulp.src(config.ts)
    .pipe(config.tsProject());
  return eventStream.merge(
    tsResult.js
      .pipe(gulp.dest('.')),
    tsResult.dts
      .pipe(plugins.rename('hawtio-forms.d.ts'))
      .pipe(gulp.dest(config.dist))
  );
});

gulp.task('less', function () {
  return gulp.src(config.less)
    .pipe(plugins.less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(plugins.concat(config.css))
    .pipe(gulp.dest(config.dist));
});

gulp.task('template', ['tsc'], function() {
  return gulp.src(config.templates)
    .pipe(plugins.angularTemplatecache({
      filename: 'templates.js',
      root: 'plugins/',
      standalone: true,
      module: config.templateModule,
      templateFooter: '}]); hawtioPluginLoader.addModule("' + config.templateModule + '");'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('concat', ['template'], function() {
  return gulp.src(['compiled.js', 'templates.js', config.vendorJs])
    .pipe(plugins.concat(config.js))
    .pipe(gulp.dest(config.dist));
});

gulp.task('clean', ['concat'], function() {
  return del(['templates.js', 'compiled.js']);
});

gulp.task('watch-less', function() {
  gulp.watch(config.less, ['less']);
});

gulp.task('watch', ['build', 'build-example', 'watch-less'], function() {
  gulp.watch(['index.html', urljoin(config.dist, '*')], ['reload']);
  gulp.watch([config.ts, config.templates], ['tsc', 'template', 'concat', 'clean']);
  gulp.watch([config.testTs, config.testTemplates], ['example-template', 'example-concat', 'example-clean']);
});

gulp.task('connect', ['watch'], function() {
  plugins.connect.server({
    root: '.',
    livereload: true,
    port: 2772
  });
});

gulp.task('reload', function() {
  gulp.src('.')
    .pipe(plugins.connect.reload());
});

gulp.task('site', ['build', 'build-example'], function() {
  gulp.src('website/.gitignore')
    .pipe(gulp.dest('site'));
  gulp.src('website/*')
    .pipe(gulp.dest('site'));
  gulp.src('index.html')
    .pipe(plugins.rename('404.html'))
    .pipe(gulp.dest('site'));
  gulp.src(['README.md', 'index.html', 'css/**', 'images/**', 'img/**', 'libs/**/*.js', 'libs/**/*.css', 'libs/**/*.swf', 'libs/**/*.woff','libs/**/*.woff2', 'libs/**/*.ttf', 'libs/**/*.map', 'dist/**'], {base: '.'})
    .pipe(gulp.dest('site'));

  var dirs = fs.readdirSync('./libs');
  dirs.forEach(function(dir) {
    var path = './libs/' + dir + "/img";
    try {
      if (fs.statSync(path).isDirectory()) {
        console.log("found image dir: " + path);
        var pattern = 'libs/' + dir + "/img/**";
        gulp.src([pattern]).pipe(gulp.dest('site/img'));
      }
    } catch (e) {
      // ignore, file does not exist
    }
  });
});

gulp.task('deploy', ['build', 'build-example', 'site'], function() {
  return gulp.src(['site/**', 'site/**/*.*', 'site/*.*'], { base: 'site' })
    .pipe(plugins.debug({title: 'deploy'}))
    .pipe(plugins.ghPages({
      message: "[ci skip] Update site"
    }));
});

gulp.task('build', ['tsc', 'less', 'template', 'concat', 'clean']);
gulp.task('build-example', ['example-tsc', 'example-template', 'example-concat', 'example-clean']);
gulp.task('default', ['connect']);
