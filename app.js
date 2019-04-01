// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
const express = require('express');

// Handles the handlebars
const hbs = require('hbs');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

const projectName = 'lab-express-irontumblr';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// bind user to view - locals
// Hacemos disponible el usuario en todas las vistas
app.use('/', (req, res, next) => {
  res.locals.user = req.session?.currentUser || null;
  next();
});

//  Start handling routes here
const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);

// Rutas relacionadas con los posts y comentarios
const postRoutes = require('./routes/post.routes');
app.use('/', postRoutes);

//  To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
