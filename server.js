var 
    md5,
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
md5        = require('MD5');

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
// ----------------------

// authenticate user
app.post('/api/authenticateUser', function (req, res) {
    var pw = md5(req.body.password).substring(0,15);
    var q  = "SELECT password FROM users WHERE username = '" + req.body.username + "'";
    db.query(q, function (err, result) {
        if (err) { console.log(err); } 
        res.send({ status: result.length && pw === result[0].password ? 'success' : 'fail' });
    }); 
}); 

// GET all contacts
app.get('/api/getAllContacts', function (req, res) {
    var q = 'SELECT * FROM contacts INNER JOIN contactinfo ON contacts.userid = contactinfo.userid ORDER BY contacts.lastname'; 
    db.query(q, function (err, result) {
        if (err) { console.log(err); }
        res.json(result); 
    });
});

// GET contact by userid
app.get('/api/getContactById/:userid', function (req, res) {
    var q = 'SELECT * FROM contacts INNER JOIN contactinfo ON contacts.userid = contactinfo.userid WHERE contacts.userid = ' + req.params.userid;
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
    q1 = 'INSERT INTO contacts SET userid = ?, firstname = ?, lastname = ?, imgurl = ?';

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

    q = 'UPDATE contacts c INNER JOIN contactinfo ci ON c.userid = ci.userid SET c.firstname = ?, c.lastname = ?, c.imgurl = ?, ci.email = ?, ci.homephone = ?, ci.cellphone = ?, ci.workphone = ?, ci.address = ?, ci.address2 = ?, ci.city = ?, ci.state = ?, ci.zip = ? WHERE ci.userid = ' + req.params.userid + ' AND c.USERID = ' + req.params.userid;

    db.query(q, values, function (err, result) {
        if (err) { console.log(err); }
        res.send(result);
    }); 
});

// DELETE delete contact
app.post('/api/deleteContact/:userid', function (req, res) {
    var q = 'DELETE c, ci FROM contacts c INNER JOIN contactinfo ci ON c.userid = ci.userid WHERE c.userid = ' + req.params.userid;
    db.query(q, function (err, result) {
        if (err) { console.log(err); }
        res.send(result);
    }); 
});




