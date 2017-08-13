let Koa = require("koa");
let coBodyParser = require("co-body");
let fs = require("fs");

// get the Koa instance
let app = new Koa();

let port = process.argv[2];

app.use(async (ctx, next) => {
    if (ctx.path !== "/json") {
        return await next();
    }
    ctx.body = {foo: 'bar'};
});

app.use(async (ctx, next) => {
    if (ctx.path !== "/stream") {
        return await next();
    }
    ctx.body = fs.createReadStream(process.argv[3]);
});

app.listen(port, function () {
    console.log(`server is listening on ${port}`);
});
