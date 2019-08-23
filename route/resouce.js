'use strict';

const express = require('express');
const router = express.Router();

const util = require('../util');
const wholesaleController = require('../controller/admin/wholesale');



util.restRoute('/wholesale', router, wholesaleController);


util.buildRoute([
], router, wholesaleController);


module.exports = router;
