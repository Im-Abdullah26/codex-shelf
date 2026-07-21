const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
 text: {
  type: String,
  required: true
},
reviewer: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},
book: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'book',
  required: true
}

})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review;