let Koa = require("koa");

// get the Koa instance
let app = new Koa();

let port = process.argv[2];

app.use(function (ctx, next) {
    ctx.body = "hello koa";
});

app.listen(port, function () {
    console.log(`server is listening on ${port}`);
});
