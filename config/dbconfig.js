

//Set up mongoose connection
//var config = require('./config/config_paramas');
var mongoose = require('mongoose');

exports.dbconnection = function(type){
  mongoose.connect(type, {useMongoClient: true}); 
  // Get Mongoose to use the global promise library
  mongoose.Promise = global.Promise;
  //Get the default connection
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  //db.on('success', console, 'mongoose contected to database');
 //next();
}
