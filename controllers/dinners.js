const express = require('express');
const router = express.Router();
const Dinner = require('../models/dinner')

// Middleware to protect selected routes
const ensureSignedIn = require('../middleware/ensure-signed-in');

// All routes start with '/dinners'

// GET /dinners (index functionality) UN-PROTECTED - all users can access
router.get('/', (req, res) => {
  res.render('dinners/index.ejs', { title: 'All Dinners' });
});

// GET /dinners/new (new functionality) PROTECTED - only signed in users can access
router.get('/new', ensureSignedIn, (req, res) => {
  res.render('dinners/new.ejs', { title: 'Share your Dinner!' });
});

// POST /dinners (create functionality)
router.post('/', async (req, res) => {
  try {
    req.body.username = req.user._id;
    await Dinner.create(req.body);
    res.redirect('/dinners');
  } catch (err) {
    console.log(err);
    res.redirect('dinners/new');
  }
});



module.exports = router;