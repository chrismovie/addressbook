var 
    mysql, 
    db,
    express, 
    bodyParser,
    app, 
    port, 
    env
;

// required modules
express    = require('express');
bodyParser = require('body-parser');
mysql      = require('mysql'); 

// express app
app        = express();

// get environment
env        = app.get('env') === 'development' ? 'dev' : app.get('env');
port       = process.env.PORT || 3000;

// create database connection
db         = mysql.createConnection(require('./database')[env]); 

db.connect(); 

// configure server
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false, limit: 10000000 }));
app.use(bodyParser.json({ limit: 10000000 }));
app.listen(port);

// APIS

// Get all contacts
app.get('/api/getAllContacts', function (req, res) {
    var q = 'SELECT * FROM users INNER JOIN contactinfo ON users.userid = contactinfo.userid';
    db.query(q, function (err, result) {
        if (err) { console.log(err); }
        res.json(result); 
    });
});