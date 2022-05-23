const express = require('express');
const router = express.Router();
const moviesCtrl = require('../controllers/movies');

/* All routes start with '/movies' */

// GET /movies (index functionality - show all movies)
// router.get('/', moviesCtrl.index);

// GET /movies/new  (new functionality - render 'new' form)
router.get('/new', moviesCtrl.new);

// GET /movies/search  (search functionality - render 'search' results)
router.get('/search', moviesCtrl.search);

// GET /movies/:id (show functionality - show single movie)
// router.get('/:id', moviesCtrl.show);

// POST /movies/  (create functionality - create new movie)
// router.post('/', isLoggedin, moviesCtrl.create);

module.exports = router;
