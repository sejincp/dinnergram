const express = require('express');
const router = express.Router();

// Middleware to protect selected routes
const ensureSignedIn = require('../middleware/ensure-signed-in');

// All routes start with '/dinners'

// GET /dinners (index functionality) UN-PROTECTED - all users can access
router.get('/', (req, res) => {
  res.render('dinners/index.ejs', { title: 'All Dinners' });
});

// GET /dinners/new (new functionality) PROTECTED - only signed in users can access
router.get('/new', ensureSignedIn, (req, res) => {
  res.send('Add a dinner!');
});



module.exports = router;