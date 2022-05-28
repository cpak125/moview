const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

// POST /movies/:id/reviews (create a review)
router.post('/movies/:id/reviews', reviewsCtrl.create);

// DELETE /reviews/:id (delete review that corresponds to logged in user)
router.delete('/reviews/:id', reviewsCtrl.delete);

// EDIT /review/:id (edit review that corresponds to logged in user)


module.exports = router;