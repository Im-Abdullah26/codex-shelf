const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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

})

module.exports 