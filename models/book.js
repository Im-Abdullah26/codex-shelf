const mongoose = require('mongoose');

const Schema = mongoose.Schema

const bookSchema = new Schema({
  title: String,
  author: String,
  description: String,
  content: String,
  coverImage: String,
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book