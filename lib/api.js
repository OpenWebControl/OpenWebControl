const express = require('express');
const query = require('./query');
const router = express.Router();

router.get('/auth/login', async (req, res) => {
    var lol = await query.auth_login('user', 'BasToTheMax', 'MyPassword!');
    if (lol[0]) {
        return res.json({ ok: true, data: lol });
    } else {
        return res.json({ ok: false, msg: 'Wrong combination of type, username and password' });
    }
});

module.exports = router;
