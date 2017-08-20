let Koa = require("koa");
let session = require("koa-session");
let views = require("co-views");
let ejs = require("ejs");

// get the Koa instance
let app = new Koa();

let port = process.argv[2] || 4000;

// set views
let render = views(__dirname + "/views", {ext: ejs});

// setup for session
app.keys = ['secret', 'keys'];

app.use(session(app));

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
