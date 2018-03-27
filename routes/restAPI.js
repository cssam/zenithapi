var express = require('express');
var router = express.Router();
var Event= require('../models/event');

router.get("/events", function(req, res, err) {
    Event.find()
    .populate('activity')
    .sort([['event_date', 'ascending']])
    .exec(function (err, list_events) {
        if (err) res.send(err);
            res.json(list_events);
        });
});

router.get("/event/:id", function(req, res, next) {
    Event.findById(req.params.id)
    .populate('activity')
    .exec(function (err, data) {
        if (err) res.send(err);
        res.json(data);
    });
});

module.exports = router;