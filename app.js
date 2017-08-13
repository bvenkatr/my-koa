let Koa = require("koa");

// get the Koa instance
let app = new Koa();

let port = process.argv[2];

app.use(async (ctx, next) => {
    if (ctx.path !== "/") {
        return await next()
    }
    ctx.body = "hello koa";
});

app.use(async (ctx, next) => {
    if (ctx.path !== "/404") {
        return await next()
    }
    ctx.body = "page not found"
});

app.use(async (ctx, next) => {
    if (ctx.path !== "/500") {
        return await next();
    }
    ctx.body = "internal server error";
});

app.listen(port, function () {
    console.log(`server is listening on ${port}`);
});
