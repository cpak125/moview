const express = require('express');
const router = express.Router();
const moviesCtrl = require('../controllers/movies');
const isLoggedIn = require('../config/auth');

/* All routes start with '/movies' */

// GET /movies (index functionality - show all movies)
router.get('/', moviesCtrl.index);

// GET /movies/new  (new functionality - render 'new' form)
router.get('/new', isLoggedIn, moviesCtrl.new);

// POST /movies/  (create functionality - create new movie)
router.post('/', isLoggedIn, moviesCtrl.create);

// GET /movies/search  (search functionality - render 'search' results)
router.get('/search', moviesCtrl.search);

// GET /movies/:id (show functionality - show single movie)
router.get('/:id', moviesCtrl.show);



module.exports = router;
