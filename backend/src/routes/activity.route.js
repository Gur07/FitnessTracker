const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity.controller');   
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware.authUser, activityController.createActivity);
router.get('/', authMiddleware.authUser, activityController.getActivities);
router.get('/:id', authMiddleware.authUser, activityController.getActivityById);
router.put('/:id', authMiddleware.authUser, activityController.updateActivity);
router.delete('/:id', authMiddleware.authUser, activityController.deleteActivity);


module.exports = router;