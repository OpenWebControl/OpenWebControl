const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log(`${req.method} - ${req.path} - ${res.statusCode}`);
    return next();
});

router.get('/auth/login', (req, res) => {
    return res.json({});
});

module.exports = router;
