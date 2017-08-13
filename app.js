let Koa = require("koa");
let coBodyParser = require("co-body");

// get the Koa instance
let app = new Koa();

let port = process.argv[2];

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

app.listen(port, function () {
    console.log(`server is listening on ${port}`);
});
