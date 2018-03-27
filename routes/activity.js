var express = require('express');
var router = express.Router();

var activity_controller = require('../controllers/activityController');


/* GET request for creating activity.*/
router.get('/activity/create', activity_controller.activity_create_get);

/* POST request for creating activity. */
router.post('/activity/create', activity_controller.activity_create_post);

/* GET request to delete activity. */
router.get('/activity/:id/delete', activity_controller.activity_delete_get);

// POST request to delete activity
router.post('/activity/:id/delete', activity_controller.activity_delete_post);

/* GET request to update activity. */
router.get('/activity/:id/update', activity_controller.activity_update_get);

// POST request to update activity
router.post('/activity/:id/update', activity_controller.activity_update_post);

/* GET request for one activity */
router.get('/activity/:id', activity_controller.activity_detail);

/* GET request for list of all activity */
router.get('/activitys', activity_controller.activity_list);


module.exports = router;
