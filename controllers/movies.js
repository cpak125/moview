const fetch = require('node-fetch');
const key = process.env.TMDB_KEY;
const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${key}
&languange=en-US&query=`;
const detailURL = `https://api.themoviedb.org/3/search/movie`;

module.exports = {
  new: newMovie,
  search
};

function newMovie(req, res) {
  res.render('movies/new', {title: 'Add Movie'});
}

async function search(req, res) {
  let title = req.query.title;
  if (!title) return res.render('movies/new');
  const apiResult = await fetch(`${searchURL}${title}`).then(res => res.json());
  const searchResults = apiResult.results;
  if (!searchResults) return res.render('movies/new');
  res.render('movies/search', {title: 'Search Results', searchResults});
}