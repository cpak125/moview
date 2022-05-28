const express = require('express');
const reviews = require('../controllers/reviews');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

// POST /movies/:id/reviews (create a review)
router.post('/movies/:id/reviews', reviewsCtrl.create);

// DELETE /reviews/:id (delete review that corresponds to logged in user)
router.delete('/reviews/:id', reviewsCtrl.delete);

// EDIT /reviews/:id/edit (edit review that corresponds to logged in user)
router.get('/reviews/:id/edit', reviewsCtrl.edit);

// UPDATE /reviews/:id (edit review that corresponds to logged in user)
router.put('/reviews/:id', reviewsCtrl.update);

module.exports = router;