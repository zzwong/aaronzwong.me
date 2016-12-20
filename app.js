/**
 * Module dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');


/**
 * Load environment keys and variables
 */
dotenv.load({ path: '.env' });

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const blogController = require('./controllers/blog');
const blogAdminController = require('./controllers/admin')

/**
 * Passport configuration
 */
//const passportConfig = require('./config/passport')

/**
 * Create express server
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});


/**
 * express configs
 */
app.set('port', 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));


/**
 * Primary app routes
 */
app.get('/', homeController.index);
app.get('/MLpaper', homeController.getPaper);
app.get('/resume', homeController.getResume);


/**
 * Blog routes
 */
//app.get('/blog', blogController.getBlog);
//app.post('/blog', blogController.postBlog);
//app.post('/blog/admin', passportConfig.isAuthenticated, blogController.adminLogin);
//app.get('/blog/title', blogController.getBlogByTitle); // Use title because its better for SEO

// Handle tags
//app.get('/blog/tag/', blogController.getBlog);

app.get('/blog/admin/login', blogAdminController.getLogin);

app.listen(8080, ()=> {
  console.log('express server listening on port 8080 ');
});
module.exports = app;
