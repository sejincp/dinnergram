const express = require('express');
const router = express.Router();
const Dinner = require('../models/dinner')

// Middleware to protect selected routes
const ensureSignedIn = require('../middleware/ensure-signed-in');

// All routes start with '/dinners'

// GET /dinners (index functionality) UN-PROTECTED - all users can access
router.get('/', async (req, res) => {
  const dinners = await Dinner.find({}).populate('user');
  res.render('dinners/index.ejs', { title: 'All Dinners', dinners });
});

// GET /dinners/new (new functionality) PROTECTED - only signed in users can access
router.get('/new', ensureSignedIn, (req, res) => {
  res.render('dinners/new.ejs', { title: 'Share your Dinner!' });
});

// GET /dinners/:dinnerId (SHOW functionality / action)
router.get('/:dinnerId', ensureSignedIn, async (req, res) => {
  const dinner = await Dinner.findById(req.params.dinnerId).populate('user');
  res.render('dinners/show.ejs', { title: 'Details', dinner})
});

// POST /dinners (CREATE functionality / action)
router.post('/', ensureSignedIn, async (req, res) => {
  try {
    req.body.user = req.user._id;
    await Dinner.create(req.body);
    res.redirect('/dinners');
  } catch (err) {
    console.log(err);
    res.redirect('dinners/new');
  }
});

// DELETE /dinners/:dinnerId (DELETE functionality / action)

// GET /dinners/dinnerId/edit (EDIT functionality / action)

module.exports = router;