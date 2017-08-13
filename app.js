let Koa = require("koa");

// get the Koa instance
let app = new Koa();

let port = process.argv[2];

app.use(async(ctx, next) => {
    // I think we can use ctx.is('json') also
    if (ctx.request.is('json')) {
        ctx.body = {message: 'hi!'};
    } else {
        ctx.body = "ok";
    }
});

app.listen(port, function () {
    console.log(`server is listening on ${port}`);
});
