// Required modules
var express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');

var user = require('./controller/authentication');
var employee = require('./controller/employee');
var file = require('./controller/fileupload');

const host = 'localhost';
const port = process.env.port || 3000;
var router = express.Router();

// Middleware functions
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH. OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, x-access-token, Content-Length, Accept');
  next();
});
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// app.use('/api', router);
// app.post('/employee/create', employee.createEmployee);
// app.post('/user/create', user.createUser);

app.post('/user/signup', user.userRegistration);
app.post('/user/login', user.userLogin);
app.post('/add', employee.addEmployees);
app.get('/get', employee.getEmployees);

app.post('/upload', file.addfile);
// app.get('/api/get', file.readfile);

app.listen(port, host, function() {
    console.log(`Express server is listening on http://${host}:${port}`);
});