const Note = require("../models/noteModel")

const getNotes = async (req, res) => {
  try {
    const allNotes = await Note.find({ user_id: req.id })
    if (!allNotes) {
      res.json({ message: 'no notes found' })
    } else {
      res.json({ allNotes })
    }
  } catch (error) {
    console.log(error.message)
  }
}

const addNote = async (req, res) => {
  try {
    const { text } = req.body
    if (!text) {
      res.json({ err: 'text cannot be empty' })
    } else {
      const note = await new Note({
        text,
        user_id: req.id
      })
      if (!note) {
        res.json({ err: 'error, please try again' })
      } else {
        note.save()
        res.json({ success: note })
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}

const remNote = async (req, res) => {
  try {
    const id = req.header('id')
    if (!id) {
      res.json({ err: 'id not provided' })
    } else {
      let note = await Note.findById(id)
      if (!note) {
        res.json({ err: 'no note found' })
      } else {
        note = await Note.findByIdAndDelete(id)
        res.json({ deleted: id })
      }
    }
  } catch (error) {
    console.log(error.messages)
  }
}

const editNote = async (req, res) => {
  try {
    const { text } = req.body
    const id = req.header('id')
    console.log(text, id)
    if (!id) {
      res.json({err: 'id not provided'})
    } else if (!text) {
      res.json({err: 'no text provided'})
    } else {
      let note = await Note.findByIdAndUpdate(id, {
        text
      })
      note.save()
      if (!note) {
        res.json({err: 'no note found'})
      } else {
        res.json({updated: note})
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  getNotes,
  addNote,
  remNote,
  editNote,
}