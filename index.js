// Import packages
const express = require('express');
const config = require('./lib/config');
const logger = require('./lib/logging');

// Import api routes
const apiRoutes = require('./lib/api');

const app = express();
const query = require('./lib/query');

app.use((req, res, next) => {
    logger.info(`${req.method} - ${req.path} - ${res.statusCode}`);
    return next();
});

// Use api routes
app.use(express.json());
app.set('json spaces', 4);
app.set('view engine', 'ejs');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use('/api', apiRoutes);

app.get('/login', async function(req, res) {
    var valid = await query.session_valid(req.cookies['sessionID']);
    if (valid == true) return res.redirect('/');

    res.render(`${config.main.theme}/login`, {
        title: config.main.title
    });
});

app.get('/', async function(req, res) {
    var valid = await query.session_valid(req.cookies['sessionID']);
    if (valid == false) return res.redirect('/login');


    res.render(`${config.main.theme}/index`, {
        title: config.main.title
    });
});

// Run the webserver
app.listen(config.main.port, () => {
    logger.info(`App online at http://localhost:${config.main.port} !`);
});

setInterval(async () => {
    // logger.info('Checking for expired sessions...');
    await query.session_all();
}, 60 * 1000);