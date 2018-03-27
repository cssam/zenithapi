var mongoose = require('mongoose');
ObjectId = mongoose.Types.ObjectId;
var mongojs = require('mongojs');

var Activity = require('../models/activity');

// Display activity list of all
exports.activity_list = function(req, res, next) {
  console.log('in activity : activity_list');
  Activity.find().sort([['create_date', 'ascending']]).exec(function (err, list_activitys) {
   if (err) {
     console.log('in controller : activity_list err: '+err);
     return next(err);
   }
   console.log('in controller : activity_list result: ');
   res.render('activity_list.ejs' , { title: 'Activitis', activitys: list_activitys});
 });
};

// Display event detail page for a specific
exports.activity_detail = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: activity detail: ' + req.params.id);
        Activity.findById(req.params.id)
        .exec(function (err, data) {
        if (err) { return next(err); }
        Activity.find().sort([['create_date', 'ascending']]).exec(function (err, list_activitys) {
            if (err) {
                return next(err);
            }
            res.render('activity_detail', { title: 'Activity', activity: data, activitys: list_activitys});
            });
        });
};

// Display activity create form on GET
exports.activity_create_get = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: activity create GET');
    res.render('activity.ejs');
};

// Handle activity create on POST
exports.activity_create_post = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: activity create post');
    var body = req.body;
    var save = body.save;
    console.log('save: '+save);
    if(save == "Cancel"){
        res.redirect("/activityAPI/activitys");
    } else {
        req.checkBody('activity_name', 'Activity name is required').notEmpty(); 
        req.checkBody('activity_name', 'Invalid characters').isAlpha();
        req.sanitize('activity_name').escape();
        req.sanitize('activity_name').trim();

        req.checkBody('description', 'Invalid characters').isAlpha();
        req.checkBody('description', 'Description is required').notEmpty(); 
        req.sanitize('description').escape();
        req.sanitize('description').trim();
        //Run the validators
        var errors = req.validationErrors();
    
        var activity = new Activity(
            {
                create_date : new Date(),
                activity_name: body.activity_name,
                description : body.description,
            }
        );
        console.log('activity: '+activity);
        activity.save(function (err) {
            if (err) { return next(err); }
            res.redirect(activity.url);
        });
    }
};

// Display activity update form on GET
exports.activity_update_get = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: activity update GET');
    Activity.findById(req.params.id)
    .exec(function (err, data) {
        if (err) { return next(err); }
        res.render('activity_update.ejs', { title: 'Activity', activity: data});
    });
};

// Handle activity update on POST
exports.activity_update_post = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: activity update POST');
    var body = req.body;
    var save = body.save;
    console.log('save: '+save);
    if(save == "Cancel"){
        res.redirect("/activityAPI/activitys");
    } else {
        req.checkBody('activity_name', 'Activity name is required').notEmpty();
        req.checkBody('activity_name', 'Invalid name').isAlpha();
        req.sanitize('activity_name').escape();
        req.sanitize('activity_name').trim();
        
        req.checkBody('description', 'Description is required').notEmpty();
        req.checkBody('description', 'Invalid characters').isAlpha();
        req.sanitize('description').escape();
        req.sanitize('description').trim();
        
        //Run the validators
        var errors = req.validationErrors();

        var activity = new Activity(
            {
                activity_name: body.activity_name,
                description: body.description,
                _id: req.params.id
            }
        );
        console.log('activity: '+activity);
        Activity.findByIdAndUpdate(req.params.id, activity, {}, function (err, theactivity) {
            if (err) { return next(err); }
            //successful - redirect to activity detail page.
            res.redirect(theactivity.url);
        });
    }
};



// Display activity delete form on GET
exports.activity_delete_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: activity delete GET');
};

// Handle activity delete on POST
exports.activity_delete_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: activity delete POST');
};

