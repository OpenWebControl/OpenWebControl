const express = require('express');
const router = express.Router();
const log = require('./logging');

router.use((req, res, next) => {
    log.info(`${req.method} - ${req.path} - ${res.statusCode}`);
    return next();
});

router.get('/auth/login', (req, res) => {
    return res.json({});
});

module.exports = router;
