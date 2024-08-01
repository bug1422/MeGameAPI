const config = require('./config')
const { connectDB, createMongoStore } = require("./config/db_context")
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const flash = require('express-flash')
const passport = require('./authentication/passport')
const path = require('path')
const bodyParser = require('body-parser')
// [
//     "Access-Control-Allow-Headers",
//     "Access-Control-Request-Method",
//     "Access-Control-Request-Headers",
//     "Origin",
//     "Accept",
//     "X-Requested-With",
//     "Content-Type",
// ],
//config
var corsConfig = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    allowedHeaders: "Content-Type,Authorization",
    optionsSuccessStatus: 204
}

var app = express();

//Router
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');

//constants
const port = config.port
const sessionStore = createMongoStore(config.dbConnectionString)
// Connect to DB
connectDB(config.dbConnectionString)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Midleware
app.use(cors(corsConfig))
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session({
//     secret: config.sessionSecret,
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore,
//     cookie: {
//         maxAge: config.maxAge
//     }
// }))
app.use(flash())
app.use(passport.initialize())
// app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.listen(port, () => { console.log(`Listening on PORT ${port}`) })

module.exports = app