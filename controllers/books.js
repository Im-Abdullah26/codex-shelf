const Book = require('../models/book')
const Review = require('../models/review')

const showNewForm = (req, res) => {
  res.render('books/new.ejs');
}

const create = async (req, res) => {
  const bookData = {}
  bookData.title = req.body.title
  bookData.author = req.body.author
  bookData.description = req.body.description
  bookData.publisher = req.session.user._id
  bookData.coverImage = req.body.coverImage

  await Book.create(bookData);

  res.redirect('/books');


}

const index = async (req, res) => {
    const allBooks = await Book.find().populate('publisher')
    res.render('books/index.ejs', {
    books: allBooks,})
}

const show = async (req, res) => {
    const foundBook = await Book.findById(req.params.bookId).populate('publisher')
    
    res.render('books/show.ejs', {
    foundBook: foundBook,
  })
}

const deleteBook= async (req, res) => {
  await Book.findByIdAndDelete(req.params.bookId)
  res.redirect('/books')

}

const showEditForm = async (req, res) => {
  const foundBook = await Book.findById(req.params.bookId);

  res.render('books/edit.ejs', {
   foundBook: foundBook,
  })
}

const updateBook = async (req, res) => {
  await Book.findByIdAndUpdate(
    req.params.bookId,
    req.body
  )
   res.redirect(`/books/${req.params.bookId}`)
}

const createReview = async (req, res) => {
  const reviewData = {}

  reviewData.text = req.body.text
  reviewData.reviewer = req.session.user._id
  reviewData.book = req.params.bookId

  await Review.create(reviewData)

  res.redirect(`/books/${req.params.bookId}`)
}

module.exports = {
  showNewForm,
  create,
  index,
  show,
  deleteBook,
  showEditForm,
  updateBook,
  createReview,
}