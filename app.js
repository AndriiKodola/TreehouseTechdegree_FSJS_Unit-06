const express = require('express');
const bodyParser = require('body-parser');
const { projects } = require('./data.json');
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

/**Serving static files */
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

/**Requiring projects route */
const projectRoutes = require('./routes/projects');

app.use('/projects', projectRoutes);

/**
 * Routes
 */
app.get('/', (req, res, next) => {
    res.render('index', { projects });
});

app.get('/about', (req, res, next) => {
    res.render('about');
});

/**
 * Error handlers
 */
app.use((req, res, next) => {
    const err = new Error('Got lost?');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    console.log(`An error occured. Error status: ${err.status}.`);
    res.status(err.status);
    res.render('error');
});

/**
 * Setting the server
 */
app.listen(port, () => {
    console.log('Potfolio app is running on localhost:3000');
});

/**
 * TO-DO:
 *
 * Optionally - the path module which can be used when setting the absolute path in the express.static function.
 * Add more imgs
 * Add live link
 * Add 404 or "coming soon" for projects from 5
 */
