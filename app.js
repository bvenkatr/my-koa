'use strict';
var koa = require('koa');
var app = module.exports = koa();
var parse = require('co-body');

let port = process.argv[2] || 3000;

app.use(function *(next) {
  if (this.path !== '/') {
    return yield next;
  }

  this.body = "Hello KoaJS";
});

if (!module.parent) app.listen(port, function () {
  console.log(`Web Server is listening at ${port}`)
});