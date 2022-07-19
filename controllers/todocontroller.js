var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Dhanvi:Dhanvi2001@todo.wf05h3k.mongodb.net/?retryWrites=true&w=majority");

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
/*var itemOne = Todo({ item: 'get flowers' }).save(function(err) {
    if (err) throw err;
    console.log('item saved!');
});*/

//var data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'do coding' }];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {


    app.get('/todo', function(req, res) {
        //res.render('todo', { todos: data });
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        });
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
        //data.push(req.body);
        //res.json(data);
    });

    app.delete('/todo/:item', function(req, res) {
        Todo.find({ item: req.params.item.replace(/\-/g, ' ') }).remove(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
        /*data = data.filter(function(todo) {
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);*/
    });




};