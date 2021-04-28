/**
 * app.js será el fichero de entrada a la aplicación, y la primera vista que app.js
 * mostrará será index.hbs ('/').
 */

require('dotenv').config();

const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User.model');
const Park = require('./models/Park.model');
const session = require('express-session'); 
const MongoStore = require('connect-mongo');
const app = express();

//User validation with passport
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL
    })
  })
)

passport.serializeUser((user, cb) => {
    cb(null, user._id)
  }),

  passport.deserializeUser((id, cb) => {
    User.findById(id)
      .then(user => cb(null, user))
      .catch((error) => cb(error))
  })

require('./configs/passport.config')(app);

mongoose
  .connect('mongodb://localhost/parkfinder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

// Middleware Setup
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
// app.use(cookieParser());
require('./configs/middleware.config')(app);


// Express View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// default value for title local
app.locals.title = 'Park Finder | Find your park!';


// Routes middleware

const parkRouter = require('./routes/parks.routes');
app.use('/parks', parkRouter);

const indexRouter = require('./routes/index.routes');
app.use('/', indexRouter);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);



module.exports = app;