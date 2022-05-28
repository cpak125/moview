const Movie = require('../models/movie');

module.exports = {
  create,
  // delete: deleteReview,
  // edit
};

function create(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    movie.reviews.push(req.body);
    movie.save(function(err) {
      res.redirect(`/movies/${movie._id}`);
    });
  });
}