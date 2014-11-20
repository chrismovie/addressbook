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
app.use(bodyParser.urlencoded({ extended: false, limit: 1000000000 }));
app.use(bodyParser.json({ limit: 1000000000 })); 
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

// POST create new contact
app.post('/api/createContact', function (req, res) {

    var q1, q2, values1, values2;

    values1 = [
        req.body.userid,
        req.body.firstname,
        req.body.lastname,
        req.body.imgurl
    ];
    q1 = 'INSERT INTO users SET userid = ?, firstname = ?, lastname = ?, imgurl = ?';

    values2 = [
        req.body.userid,
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
    q2 = 'INSERT INTO contactinfo SET userid = ?, email = ?, homephone = ?, cellphone = ?, workphone = ?, address = ?, address2 = ?, city = ?, state = ?, zip = ?';

    db.query(q1, values1, function (err, result) {
        if (err) { console.log(err); }
    });

    db.query(q2, values2, function (err, result) {
        if (err) { console.log(err); }
        res.send(result);
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

    q = 'UPDATE users u INNER JOIN contactinfo c ON u.userid = c.userid SET u.firstname = ?, u.lastname = ?, u.imgurl = ?, c.email = ?, c.homephone = ?, c.cellphone = ?, c.workphone = ?, c.address = ?, c.address2 = ?, c.city = ?, c.state = ?, c.zip = ? WHERE c.userid = ' + req.params.userid + ' AND U.USERID = ' + req.params.userid;

    db.query(q, values, function (err, result) {
        if (err) { console.log(err); }
        res.send(result);
    }); 
});



