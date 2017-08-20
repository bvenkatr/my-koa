let Koa = require("koa");
let session = require("koa-session");
let views = require("co-views");
let ejs = require("ejs");
let parse = require("co-body");

// get the Koa instance
let app = new Koa();

let port = process.argv[2] || 4000;

// set views
let render = views(__dirname + "/views", {ext: ejs});

// setup for session
app.keys = ['secret', 'keys'];

app.use(session(app));

var form = '<form action="/login" method="POST">\
      <input name="username" type="text" value="username">\
      <input name="password" type="password" placeholder="The password is \'password\'">\
      <button type="submit">Submit</button>\
    </form>';

app.use(async(ctx, next) => {
    if (ctx.path !== "/") {
        return await next();
    }
    if (ctx.session.authenticated) {
        ctx.body = "hello world";
    } else {
        ctx.throw(401);
    }
});

app.use(async(ctx, next) => {
    if (ctx.path !== "/login") return await next();
    if (ctx.method === "GET") {
        ctx.body = form;
    }
    if (ctx.method !== 'POST') return;

    var body = await parse(ctx);
    if (body.username !== 'username' || body.password !== 'password') {
        ctx.throw(400);
    }
    ctx.session.authenticated = true;
    ctx.redirect('/');
});

app.use(async(ctx, next) => {
    if (ctx.path !== "/logout") return await next();
    ctx.session.authenticated = false;
    ctx.redirect("/login");
});

app.use(async(ctx, next) => {
    if (ctx.path !== "/views") {
        await next();
    }
    ctx.body = await render('user.ejs', {
        user: {
            name: {
                first: 'Tobi',
                last: 'Holowaychuk'
            },
            species: 'ferret',
            age: 3
        }
    })
});

app.use((ctx, next) => {
    let n = ~~ctx.session.view + 1;
    ctx.session.view = n;
    ctx.body = n + " views";
});

app.listen(port, function () {
    console.log(`server is listening on ${port}`);
});
