https://github.com/koajs/kick-off-koa

https://github.com/koajs/koa/blob/master/docs/guide.md#debugging-koa

// app.get("getRata, ",(req, res) => {
//   res.statusCode = 404;
//   const ctx = this.createContext(req, res);
//   const onerror = err => ctx.onerror(err);
//   const handleResponse = () => respond(ctx);
//   onFinished(res, onerror);
//   return fn(ctx).then(handleResponse).catch(onerror);
// });


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
