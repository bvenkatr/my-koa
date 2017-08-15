let Koa = require("koa");

// get the Koa instance
let app = new Koa();

let port = process.argv[2];

app.use(async(ctx, next) => {
   try {
       await next();
   } catch(error) {
       ctx.status = 500;
       ctx.body = error.message;
   }
});

app.use((ctx) => {
    if (ctx.path === "/error") throw new Error("internal server error");
    ctx.status = 200;
    ctx.body = "OK";
});

app.listen(port, function () {
    console.log(`server is listening on ${port}`);
});
