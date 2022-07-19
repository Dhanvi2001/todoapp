var express = require('express');

var todocontroller = require('./controllers/todocontroller');


var app = express();


app.set('view engine', 'ejs');


app.use(express.static('./public'));

todocontroller(app);


app.listen(3000, '127.0.0.1');
console.log('You are lisiting to port 3000');