exports.paths = {
  src: 'src/',
  app: 'app/',
  dest: 'public/',
  build: 'dist/',
  scripts: ['src/mdCalendar.js', 'src/*.js', 'src/**/*.js', '!src/*spec.js', '!src/**/*spec.js'],
  appScripts: ['app/app.js', 'app/*.js', 'app/**/*.js'],
  css: ['src/*.scss', 'src/*.css', '!src/*spec.css', '!src/*-theme.scss'],
  appCss: ['app/style.css', 'app/**/*.css'],
  injectCss: ['public/*.css', 'public/**/*.css'],
  partials: ['app/**/*.html'],
  icons: ['src/**/*.svg'],
  bower: './bower.json'
};
