const express = require('express');
const query = require('./query');
const router = express.Router();

router.use(express.json());

router.post('/auth/login', async (req, res) => {
    var type = req.body['type'];
    var username = req.body['username'];
    var password = req.body['password'];

    if (!type) return res.json({ ok: false, msg: 'type is a required body param!' });
    if (!username) return res.json({ ok: false, msg: 'username is a required body param!' });
    if (!password) return res.json({ ok: false, msg: 'password is a required body param!' });

    var lol = await query.auth_login(type, username, password);

    if (lol[0]) {
        lol[0].password = null;
        var sesData = await query.session_new(lol[0].ID);
        
        res.cookie('sessionID', sesData.id, { maxAge: 18000000, httpOnly: false});
        return res.json({ ok: true, data: sesData });
    } else {
        return res.json({ ok: false, msg: 'Wrong combination of type, username and password' });
    }
});

module.exports = router;
