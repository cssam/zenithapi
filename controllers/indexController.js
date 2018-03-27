var Activity = require('../models/activity');
var Event = require('../models/event');

var async = require('async');

exports.index = function(req, res) {   
    
    async.parallel({
        activty_count: function(callback) {
            Activity.count(callback);
        },
        event_count: function(callback) {
            Event.count(callback);
        },
    }, function(err, results) {
        //res.render('index', { title: 'Zenith Home', error: err, data: results });
        Event.find()
        .populate('activity')
        .sort([['event_date', 'ascending']])
        .where({ 'isActive': true})
        .exec(function (err, list_events) {
          if (err) { return next(err); }
          res.render('index', { title: 'Zenith Home', error: err, data: results , events: list_events });
        });
    });
};