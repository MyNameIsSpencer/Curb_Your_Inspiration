const mongoose = require('mongoose');
const { Schema } = mongoose;

const quotePicSchema = new Schema({
  imageUrl: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
  },
  textColour: {
    type: String,
    required: false
  }
  // createdAt: {
  //   type: Date,
  //   default: Date.now(),
  // },
});

const QuotePicModel = mongoose.model('QuotePic', quotePicSchema);
module.exports = QuotePicModel;
