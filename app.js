let Koa = require("koa");

// get the Koa instance
let app = new Koa();

let port = process.argv[2];

app.keys = ['secret', 'keys'];

app.use((ctx, next) => {
    var n = ~~ctx.cookies.get("view", {signed: true}) + 1;
    ctx.cookies.set("view", n, {signed: true});
    ctx.body = n + " views";
});

app.listen(port, function () {
    console.log(`server is listening on ${port}`);
});

/*
 koa uses the cookies module to operate cookies.

 https://github.com/expressjs/cookies

 APIs:

 ctx.cookies.get(name, [options]): Get cookie name with options

 * `signed`: the cookie requested should be signed

 ctx.cookies.set(name, value, [options]): Set cookie name to value with options:

 * `signed`: sign the cookie value
 * `expires`: a Date for cookie expiration
 * `path`: cookie path, '/' by default
 * `domain`: cookie domain
 * `secure`: secure cookie
 * `httpOnly`: server-accessible cookie, true by default

 Don't forget to set options.signed in get and set to make sure the cookie is signed.

 And to use signed cookies, you need set app.keys:

 var app = koa();
 app.keys = ['secret', 'keys'];
 */
