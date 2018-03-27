var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var config = require('./config/config_paramas');
var dbConfig = require('./config/dbconfig');
dbConfig.dbconnection(config.local_docker);

var index = require('./routes');
var activity = require('./routes/activity');
var event = require('./routes/event');
var restAPI = require('./routes/restAPI');
var app = express();

// view engine
var ejsEngine = require('ejs-locals');
app.engine("ejs", ejsEngine);
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator()); 

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/", index);
app.use("/activityAPI", activity);
app.use("/eventAPI", event);
app.use("/restAPI", restAPI);

app.listen(config.port, function() {
    console.log('Server started on port ' + config.port);
});