const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
  text: {
    required: true,
    type: String,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note