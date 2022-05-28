const Movie = require('../models/movie');

module.exports = {
  create,
  delete: deleteReview,
  edit,
  update
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

function deleteReview(req, res) {
  Movie.findOne({'reviews._id': req.params.id, 'reviews.user': req.user._id})
    .then(function(movie) {
      if (!movie) return res.redirect('/movies');
      movie.reviews.remove(req.params.id);
      return movie.save();
    })
    .then(function(movie) {
      res.redirect(`/movies/${movie._id}`);
    });
}

function edit(req, res) {
  Movie.findOne({'reviews._id': req.params.id, 'reviews.user': req.user._id}, function(err, movie) {
    const review = movie.reviews.id(req.params.id);
    res.render('reviews/edit', {review, title: 'Edit Review'});
  });
};

function update(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Movie.findOne({'reviews._id': req.params.id}, function(err, movie) {
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const review = movie.reviews.id(req.params.id);
    // Ensure that the comment was created by the logged in user
    if (!review.user._id.equals(req.user._id)) return res.redirect(`/movies/${movie._id}`);
    // Update the text of the comment
    review.content = req.body.content;
    review.rating = req.body.rating;
    // Save the updated book
    movie.save(function(err) {
      // Redirect back to the book's show view
      res.redirect(`/movies/${movie._id}`);
    });
  });
}