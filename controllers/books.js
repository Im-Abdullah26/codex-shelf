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

    const foundBook = await Book.findById
    (req.params.bookId)
    .populate('publisher')

    const foundReviews= await Review.find
    ({ book: foundBook._id }).
    populate("reviewer")

    res.render('books/show.ejs', {
    foundBook: foundBook, 
    foundReviews: foundReviews,
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

const deleteReview = async (req, res) =>{
  
  const foundReview = await Review.findById(req.params.reviewId);

  if (foundReview.reviewer.equals(req.session.user._id)) {

    await Review.findByIdAndDelete(req.params.reviewId)
    res.redirect(`/books/${req.params.bookId}`)
  
  } else {
    res.send("You don't have permission to do that.")
  }

  await Review.findByIdAndDelete(req.params.reviewId)

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
  deleteReview,
}