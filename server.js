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

// GET all contacts
app.get('/api/getAllContacts', function (req, res) {
    var q = 'SELECT * FROM users INNER JOIN contactinfo ON users.userid = contactinfo.userid ORDER BY users.lastname'; 
    db.query(q, function (err, result) {
        if (err) { console.log(err); }
        res.json(result); 
    });
});

// GET contact by userid
app.get('/api/getContactById/:userid', function (req, res) {
    var q = 'SELECT * FROM users INNER JOIN contactinfo ON users.userid = contactinfo.userid WHERE users.userid = ' + req.params.userid;
    db.query(q, function (err, result) {
        if (err) { console.log(err); }
        res.json(result[0]); 
    });
});

// POST edit contact
app.post('/api/editContact/:userid', function (req, res) {

    var q, values;

    values = [
        req.body.firstname,
        req.body.lastname,
        req.body.imgurl,
        req.body.email,
        req.body.homephone,
        req.body.cellphone,
        req.body.workphone,
        req.body.address,
        req.body.address2,
        req.body.city,
        req.body.state,
        req.body.zip
    ];

    q = 'UPDATE users, contactinfo SET ' 
        + [
            'users.firstname = ?', 
            'users.lastname = ?',
            'users.imgurl = ?',
            'contactinfo.email = ?',
            'contactinfo.homephone = ?',
            'contactinfo.cellphone = ?',
            'contactinfo.workphone = ?',
            'contactinfo.address = ?',
            'contactinfo.address2 = ?',
            'contactinfo.city = ?',
            'contactinfo.state = ?',
            'contactinfo.zip = ?'
        ].join(', ') 
        + ' WHERE users.userid = ' 
        + req.params.userid;

    db.query(q, values, function (err, result) {
        if (err) { console.log(err); }
        console.log(result);
    }); 
});



