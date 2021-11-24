const express = require('express');
const router = express.Router();

router.get('/auth/login', (req, res) => {
    return res.json({});
});

module.exports = router;