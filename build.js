var metalsmith = require('metalsmith'),
  collections = require('metalsmith-collections'),
  markdown = require('metalsmith-markdown'),
  permalinks = require('metalsmith-permalinks'),
  serve = require('metalsmith-serve'),
  layouts = require('metalsmith-layouts'),
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
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Site build complete!');
    }
  });