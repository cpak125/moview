const fetch = require('node-fetch');
const Movie = require('../models/movie');
const key = process.env.TMDB_KEY;
const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${key}&languange=en-US&query=`;
const detailURL = `https://api.themoviedb.org/3/movie`;
const castURl =

  module.exports = {
    new: newMovie,
    create,
    search,
    index
  };

function index(req, res) {
  Movie.find({}).then(function(movies) {
    res.render('movies/index', {title: 'All Movies', movies});
  })
    .catch(function(err) {
      res.redirect('/movies');
    });
}

function newMovie(req, res) {
  res.render('movies/new', {title: 'Add Movie'});
}

function create(req, res) {
  Movie.findOne({'info.id': req.body.id}).exec(async function(err, movie) {
    if (movie) return res.redirect(`movies/${movie._id}`);
    else {
      const apiDetails = await fetch(`${detailURL}/${req.body.id}?api_key=${key}&language=en-US`).then(res => res.json());
      const apiCast = await fetch(`${detailURL}/${req.body.id}/credits?api_key=${key}&language=en-US`).then(res => res.json());
      const castArr = apiCast.cast.slice(0, 5).map(c => c.name);
      const genresArr = apiDetails.genres.map(g => g.name);
      Movie.create({}, function(err, movie) {
        movie.info = apiDetails;
        movie.cast = castArr;
        movie.genres = genresArr;
        movie.save(function(err) {
          if (err) return res.render('/movies/new');
          res.redirect('/movies');
        });
      });
    }
  });
}

async function search(req, res) {
  let searchParam = req.query.searchParam;
  if (!searchParam) return res.render('movies/new');
  const apiResults = await fetch(`${searchURL}${searchParam}`).then(res => res.json());
  const searchResults = apiResults.results;
  if (!searchResults) return res.render('movies/new');
  res.render('movies/search', {title: 'Add Movie', searchResults, searchParam});
};