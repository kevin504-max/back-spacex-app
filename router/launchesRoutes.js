const router = require('express').Router();
const LaunchController = require('../controllers/LaunchController');
const launchController = new LaunchController();

router.post('/launches', (request, response) => launchController.registerLaunches(request, response));
router.get('/launches', (request, response) => launchController.getLaunches(request, response));
router.get('/launches/:id', (request, response) => launchController.findLaunch(request, response));
router.get('/launches/stats', (request, response) => launchController.getLaunchesData(request, response));

module.exports = router;