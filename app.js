let Koa = require("koa");
let session = require("koa-session");

// get the Koa instance
let app = new Koa();

let port = process.argv[2];

app.keys = ['secret', 'keys'];

app.use(session(app));

app.use((ctx, next) => {
    let n = ~~ctx.session.view + 1;
    ctx.session.view = n;
    ctx.body = n + " views";
});

app.listen(port, function () {
    console.log(`server is listening on ${port}`);
});

/**
 koa-session uses cookie-based sessions, and koa-generic-session is a more
 generic implementation, as in Express.

 https://github.com/koajs/session
 https://github.com/koajs/generic-session
 */