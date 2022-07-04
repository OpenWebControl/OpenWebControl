const express = require('express');
const query = require('./query');
const router = express.Router();
const md5 = require('md5');

router.use(express.json());

router.post('/auth/login', async (req, res) => {
    var type = req.body['type'];
    var username = req.body['username'];
    var password = req.body['password'];

    if (!type) return res.json({ ok: false, msg: 'type is a required body param!' });
    if (!username) return res.json({ ok: false, msg: 'username is a required body param!' });
    if (!password) return res.json({ ok: false, msg: 'password is a required body param!' });

    var lol = query.auth_login(type, username, password);

    if (lol) {
        lol.password = null;
        var sesData = query.session_new(lol.ID, Date.now());
        
        res.cookie('sessionID', sesData.id, { maxAge: 18000000, httpOnly: false});
        return res.json({ ok: true, data: sesData, sessionID: sesData.id });
    } else {
        return res.json({ ok: false, msg: 'Wrong combination of type, username and password' });
    }
});
router.post('/auth/logout', async (req, res) => {
    if (req.cookies['sessionID']) {
        var valid = await query.session_valid(req.cookies['sessionID']);
        if (valid == false) return res.json({ ok: false, msg: 'Session expired or invalid!' });

        res.cookie('sessionID', md5(Date.now()));
        res.json({ ok: true, msg: 'Session deleted!' });
    }
});

module.exports = router;
