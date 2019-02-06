const express = require('express');
const bodyParser = require('body-parser');
const { projects } = require('./data.json');

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
    next();
});

app.get('/about', (req, res, next) => {
    res.render('about');
    next();
});

/**
 * Error handlers
 */
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

/**
 * Setting the server
 */
app.listen(3000, () => {
    console.log('Potfolio app is running on localhost:3000');
});

/**
 * TO-DO:
 * Document your style changes in your README.md file and the project submission notes.
 * 
 * Optionally - the path module which can be used when setting the absolute path in the express.static function.
 * Add more imgs
 * Add live link
 * Add 404 or "coming soon" for projects from 5
 */
