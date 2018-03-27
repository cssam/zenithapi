var express = require('express');
var router = express.Router();

var event_controller = require('../controllers/eventController');


/* GET request for creating event.*/
router.get('/event/create', event_controller.event_create_get);

/* POST request for creating event. */
router.post('/event/create', event_controller.event_create_post);

/* GET request to delete event. */
router.get('/event/:id/delete', event_controller.event_delete_get);

// POST request to delete event
router.post('/event/:id/delete', event_controller.event_delete_post);

/* GET request to update event. */
router.get('/event/:id/update', event_controller.event_update_get);

// POST request to update event
router.post('/event/:id/update', event_controller.event_update_post);

/* GET request for one event */
router.get('/event/:id', event_controller.event_detail);

/* GET request for list of all event */
router.get('/events', event_controller.event_list);


module.exports = router;
