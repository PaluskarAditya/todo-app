const express = require('express')
const { getNotes, addNote, editNote, remNote } = require('../controllers/noteController')
const auth = require('../middlewares/authMiddleware')
const router = express.Router()

router.get('/all', auth, getNotes)
router.post('/add', auth, addNote).post('/edit', auth, editNote)
router.delete('/rem', auth, remNote)

module.exports = router