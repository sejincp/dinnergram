const express = require('express');
const router = express.Router();
const dinner = require('../models/dinner')

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

// POST /dinners (create functionlity)
router.post('/', async (req, res) => {
  try {
    const dinner = await dinner.create(req.body);
    res.redirect('/dinners');
  } catch (err) {
    console.log(err);
    res.redirect('dinners/new');
  }
})



module.exports = router;