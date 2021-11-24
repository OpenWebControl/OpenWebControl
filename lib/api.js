const express = require('express');
const query = require('./query');
const router = express.Router();

router.get('/auth/login', async (req, res) => {
    var lol = await query.auth_login('user', 'BasToTheMax', 'MyPassword');
    return res.json(lol);
});

module.exports = router;
