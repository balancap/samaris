var metalsmith = require('metalsmith'),
  branch = require('metalsmith-branch'),
  headings = require('metalsmith-headings'),
  collections = require('metalsmith-collections'),
  markdown = require('metalsmith-markdown'),
  permalinks = require('metalsmith-permalinks'),
  serve = require('metalsmith-serve'),
  layouts = require('metalsmith-layouts'),
  paths = require('metalsmith-paths'),
  rootPath = require('metalsmith-rootpath'),
  inplace = require('metalsmith-in-place'),
  watch = require('metalsmith-watch'),
  moment = require('moment');

var siteBuild = metalsmith(__dirname)
  .metadata({
    site: {
      title: 'balancap.github.io/',
      url: 'http://balancap.github.io/'
    }
  })
  .source('./src')
  .destination('./build')
  // build plugins go here
  // .use(headings('h1'))
  .use(rootPath())
  .use(branch('publications/articles/*.md')
    .use(collections({
      articles: {
        pattern: 'publications/articles/*.md',
        sortBy: 'year',
        reverse: true
      }
    }))
  )
  .use(branch('!publications/articles/*.md')
    .use(markdown({
      smartypants: true,
      gfm: true,
      tables: true
    }))
  )
  .use(paths({
    property: "paths"
  }))
  // .use(permalinks({
  //   pattern: ':title',
  //   relative: false
  // }))
  .use(layouts({
    engine: 'handlebars',
    partials: 'partials'
  }))
  // Server and watch
  .use(serve({
    port: 8080,
    verbose: true
  }))
  .use(watch({
    pattern: '**/*',
    livereload: true
  }))
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Site build complete!');
    }
  });
  