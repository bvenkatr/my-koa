let Koa = require("koa");

// get the Koa instance
let app = new Koa();

let port = process.argv[2];

app.use(async(ctx, next) => {
    //step 1
    let startTime = Date.now();
    await next();
    //step 5
    ctx.set("X-Response-Time", (Date.now() - startTime) / 60)
});

app.use(async(ctx, next) => {
    //step 2
    await next();
    // step 4
    ctx.body = ctx.body.toUpperCase();
});

app.use((ctx) => {
    //step 3
   ctx.body = "hello koa";
});

app.listen(port, function () {
    console.log(`server is listening on ${port}`);
});
