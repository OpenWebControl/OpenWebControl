const express = require('express');
const router = express.Router();

router.get('/auth/login', (req, res) => {
    return res.json({});
    console.log(`${req.method} - ${req.path} - ${res.statusCode}`)
});

module.exports = router;
