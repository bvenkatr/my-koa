let Koa = require("koa");

// get the Koa instance
let app = new Koa();

let port = process.argv[2];

app.use(async(ctx, next) => {
   try {
       await next();
   } catch(error) {
       ctx.body = error.message;
   }
});

app.use((ctx) => {
    if (ctx.path === "/error") throw new Error("you are at /error path");
    ctx.body = "sdlfkdl body";
});

app.listen(port, function () {
    console.log(`server is listening on ${port}`);
});
