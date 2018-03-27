//Require Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var ActivitySchema = new Schema({
    create_date : { type: Date, default: Date.now, required: true},
    activity_name: {type: String, required: true, max: 30},
    description  : { type: String, required: true, max: 100},
});

ActivitySchema.virtual('create_date_formatted').get(function () {
    return moment(this.create_date).format('YYYY-MM-DD');
  });

ActivitySchema.virtual('url').get(function () {
    return '/activityAPI/activity/' + this._id;
  });

var activity = module.exports = mongoose.model('Activity', ActivitySchema );
