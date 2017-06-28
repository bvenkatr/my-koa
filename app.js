'use strict';
var Koa = require('koa');
var app = new Koa();

let port = process.argv[2] || 3000;

app.use(async (ctx, next) => {
  //TODO this.path is not correct to get url path, so get path from ctx
  if (this.path !== '/') {
    await next();
  }

  console.log("I should be second one");
  ctx.body = 'we are at home!';
});

app.use(async (ctx, next) => {
  console.log("I should be first one");
});

if (!module.parent) app.listen(port
    , function () {
  console.log(`Web Server is listening at ${port}`)
});
