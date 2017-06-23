const express = require('express'),
      logger = require('morgan'),
      favicon = require('serve-favicon'),
      hbs = require('express-handlebars'),
      path = require('path');
      bodyParser = require('body-parser');

var index = require('./routes/index');
var cards = require('./routes/cards');
// var update = require('./routes/update-card');

var app = express();

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/'}));
// server .hbs templates from views with res.render
app.set('views', path.join(__dirname, 'views'));
// Use Handlebars syntax {{ }}
app.set('view engine', 'hbs');

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


app.use('/', index);
app.use('/cards', cards);
// app.use('/card', update);

//listen for port
var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on ' + port);
});
