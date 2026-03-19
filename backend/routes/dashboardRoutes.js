const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const dashboardValidator = require('../validators/dashboardValidator');
const { getDashboard, saveDashboard } = require('../controllers/dashboardController');

router.get('/', getDashboard);
router.put('/', validate(dashboardValidator), saveDashboard);

module.exports = router;
