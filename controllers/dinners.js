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
router.get('/:dinnerId/edit', ensureSignedIn, async (req, res) => {
  const dinner = await Dinner.findById(req.params.dinnerId)
  res.render('dinners/edit.ejs', { title: 'Edit Dinner', dinner});
});

// PUT /dinners/dinnerId (UPDATE functioinality / action)
router.put('/:dinnerId', ensureSignedIn, async (req, res) => {
  try {
    const dinner = req.user.dinners.id(req.params.id);
    dinner.set(req.body);
    await req.user.save();
    res.redirect(`/dinners/${dinner._id}`);
  } catch (e) {
    console.log(e);
    res.redirect(`/dinners/${dinner._id}`);
  }
})

module.exports = router;