'use strict';

const express = require('express');
const uptimeHelper = require('./../helpers/uptime');

const router = express.Router();
const posts = require('./posts');

router.use('/posts', posts);

// Homeroot displayed current time and startup application time
router.get('/', (req, res) => {    
    res.status(200).json(uptimeHelper.getData());
});

module.exports = router;
