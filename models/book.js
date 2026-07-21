const mongoose = require('mongoose');

const Schema = mongoose.Schema

const bookSchema = new Schema({
 title: {
  type: String,
  required: true
},
author: {
  type: String,
  required: true
},
description: {
  type: String,
  required: true
},
coverImage: {
  type: String,
  required: true
},
publisher: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
},{ timestamps: true }) 

const Book = mongoose.model("Book", bookSchema);

module.exports = Book