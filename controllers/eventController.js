var mongoose = require('mongoose');
ObjectId = mongoose.Types.ObjectId;

var Event= require('../models/event');
var Activity = require('../models/activity');
var async = require('async');


// Display event list of all
exports.event_list = function(req, res, next) {
  console.log('in event : event_list');
  Event.find()
            .populate('activity')
            .sort([['event_date', 'ascending']])
            .exec(function (err, list_events) {
                if (err) {
                    console.log('in controller : event_list err: '+err);
                    return next(err);
                }
                console.log('in controller : event_list result: ');
                res.render('event_list' , { title: 'Events', events: list_events});
                });
};

// Display event detail page for a specific
exports.event_detail = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: event detail: ' + req.params.id);
    Event.findById(req.params.id)
        .populate('activity')
        .exec(function (err, data) {
        if (err) { return next(err); }
            Event.find().populate('activity').sort([['event_date', 'ascending']]).exec(function (err, list_events) {
                if (err) {
                  return next(err);
                }
                res.render('event_detail', { title: 'Event', event: data, events: list_events});
              }); 
        });
};

// Display event create form on GET
exports.event_create_get = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: event create GET');
    async.parallel({
        activitys: function(callback) {
            Activity.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('event.ejs', { title: 'Create Event', activitys: results.activitys});
    });
};

// Handle event create on POST
exports.event_create_post = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: event create post');
    var body = req.body;
    var save = body.save;
    console.log('save: '+save);
    if(save == "Cancel"){
        res.redirect("/eventAPI/events");
    } else {
    
        req.checkBody('start_hour', 'Event start time is required').notEmpty(); 
        req.checkBody('end_hour', 'Event end time is required').notEmpty(); 
        //req.checkBody('event_date', 'Invalid date').optional({ checkFalsy: true }).isISO8601(); 


        req.sanitize('start_hour').escape();
        req.sanitize('start_hour').trim();
        req.sanitize('end_hour').escape();
        req.sanitize('end_hour').trim();
        req.sanitize('event_date').toDate();
        
        //Run the validators
        var errors = req.validationErrors();

        var event = new Event(
            {
                event_date : body.event_date,
                create_date : new Date(),
                activity: body.activity,
                isActive: body.isActive,
                start_hour : body.start_hour,
                end_hour : body.end_hour,
            }
        );
        console.log('event: '+event);
        if (errors) {
            async.parallel({
                activitys: function(callback) {
                    Activity.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }
                res.render('event.ejs', { title: 'Create Event', event: event, activitys: results.activitys, errors: errors});
                return;
            });
            
        } else {
            event.save(function (err) {
                if (err) { return next(err); }
                res.redirect(event.url);
            });
        }
    }
};


// Display event update form on GET
exports.event_update_get = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: event update GET');
    async.parallel({
        activitys: function(callback) {
            Activity.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        Event.findById(req.params.id).populate('activity')
        .exec(function (err, data) {
            if (err) { return next(err); }
            res.render('event_update.ejs', { title: 'Update Event', event: data, activitys: results.activitys});
        });
    });
};

// Handle event update on POST
exports.event_update_post = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: event update POST');
    var body = req.body;
    var save = body.save;
    console.log('save: '+save);
    if(save == "Cancel"){
        res.redirect("/eventAPI/events");
    } else {
        req.checkBody('start_hour', 'Event start time is required').notEmpty(); 
        req.checkBody('end_hour', 'Event end time is required').notEmpty(); 
        req.sanitize('start_hour').escape();
        req.sanitize('start_hour').trim();
        req.sanitize('end_hour').escape();
        req.sanitize('end_hour').trim();
        //Run the validators
        var errors = req.validationErrors();

        var event = new Event(
            {
                event_date : body.event_date,
                create_date : new Date(),
                activity: body.activity,
                isActive: body.isActive,
                start_hour : body.start_hour,
                end_hour : body.end_hour,
                _id: req.params.id
            }
        );
        var isActive = body.isActive;
        console.log('isActive: '+isActive);
        if(isActive=='on'){
            event.isActive = true;
        } else {
            event.isActive = false;
        }

        console.log('event: '+event);
        Event.findByIdAndUpdate(req.params.id, event, {}, function (err, theevent) {
            if (err) { return next(err); }
            //successful - redirect to event detail page.
            res.redirect(theevent.url);
        });
    }
};

// Display event delete form on GET
exports.event_delete_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: event delete GET');
};

// Handle event delete on POST
exports.event_delete_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: event delete POST');
};
