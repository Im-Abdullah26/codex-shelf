const Book = require('../models/book')

const showNewForm = (req, res) => {
  res.render('books/new.ejs');
}

const create = async (req, res) => {
  const bookData = {}
  bookData.title = req.body.title
  bookData.author = req.body.author
  bookData.description = req.body.description
  bookData.publisher = req.session._id
  if (req.body.coverImage) {
    bookData.coverImage = req.body.coverImage;
  }

  await Book.create(bookData);

  res.redirect('/books');


}

module.exports = {
  showNewForm,
  create,
}