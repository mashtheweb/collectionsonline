var Templates = require('../templates');
var exampleData = require('../../src/data/object.json');
var initComp = require('../lib/init-components.js');
var getData = require('../lib/get-data.js');
var JSONToHTML = require('../../lib/transforms/json-to-html-data');
var searchListener = require('../lib/search-listener');
var Snackbar = require('snackbarlightjs');
var osdListener = require('../lib/osd-listener');
var downloadImageListener = require('../lib/download-image');

module.exports = function (page) {
  page('/objects/:id', load, render, listeners);
};

function load (ctx, next) {
  if (!ctx.isInitialRender) {
    var opts = {
      headers: { Accept: 'application/vnd.api+json' }
    };
    var id = ctx.params.id;
    var url = '/objects/' + id + '?ajax=true';
    getData(url, opts, function (err, json) {
      if (err) {
        console.error(err);
        Snackbar.create('Error getting data from the server');
        return;
      }
      var data = JSONToHTML(json);
      ctx.state.data = data;
      ctx.state.data.slides = exampleData.slides;
      next();
    });
  } else {
    ctx.state.data = {};
    ctx.state.data.slides = exampleData.slides;
    listeners(ctx, next);
  }
}

function render (ctx, next) {
  var pageEl = document.getElementsByTagName('main')[0];
  pageEl.innerHTML = Templates['objects'](ctx.state.data);
  document.getElementsByTagName('title')[0].textContent = ctx.state.data.titlePage;
  window.scrollTo(0, 0);
  next();
}

function listeners (ctx, next) {
  initComp(ctx);
  searchListener();
  osdListener(ctx);
  downloadImageListener();
}
