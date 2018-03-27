//Require Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');


var EventSchema = new Schema({
    create_date : { type: Date, default: Date.now, required:true},
    event_date : { type: Date, required: true},
    start_hour : { type: String, required: true},
    end_hour : { type: String, required: true},
    activity: {type: Schema.Types.ObjectId, required:true, ref: 'Activity'},
    isActive : {type: Boolean, required:true, default:true},
});

EventSchema.virtual('event_date_formatted').get(function () {
  return moment(this.event_date).format('YYYY-MM-DD');
});

EventSchema.virtual('url').get(function () {
    return '/eventAPI/event/' + this._id;
  });

var event = module.exports = mongoose.model('Event', EventSchema );