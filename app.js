const express = require('express'),
      logger = require('morgan'),
      favicon = require('serve-favicon'),
      hbs = require('express-handlebars'),
      path = require('path'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;


// routes
var index = require('./routes/index');
var cards = require('./routes/cards');
// var update = require('./routes/update-card');
var auth = require('./routes/auth');

app.engine('hbs', hbs({extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  helpers: {
    getTimeStamp: function (_id) {
      var timestamp = _id.toString().substring(0,8);
      return new Date( parseInt( timestamp, 16 ) * 1000 );
    }
  }
}));

// server .hbs templates from views with res.render
app.set('views', path.join(__dirname, 'views'));
// Use Handlebars syntax {{ }}
app.set('view engine', 'hbs');

// session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


app.use('/', index);
app.use('/cards', cards);
// app.use('/card', update);
app.use('/auth', auth);

//listen for port
var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on ' + port);
});
