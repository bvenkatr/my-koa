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


app.use(async (ctx, next) => {
    if (ctx.method !== "POST") {
        return await next;
    }
    let body = await coBodyParser(ctx);
    // use below url to work with coBodyParser
    // curl -H "Content-Type: application/x-www-form-urlencoded" -X POST -d '{"name" : "koa"}' localhost:4000

    //use json and make a request from curl like below
    // let body = await coBodyParser.json(ctx);
    //curl -H "Content-Type: application/json" -X POST -d '{"name" : "koa"}' localhost:4000

    // if body.name not exist, respond `400`
    if (!body.name) ctx.throw(400, '.name required');
    ctx.body = body.name.toUpperCase();
});

