import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNote, getNotes } from '../features/notes/noteSlice'

export default function AddNote() {
  const { all } = useSelector(state => state.notes)
  const disp = useDispatch()
  const [text, setText] = useState('')
  const handleAdd = () => {
    disp(addNote(text))
    // disp(getNotes())
    setText('')
  }

  useEffect(()=>{
    disp(getNotes())
  },[disp])

  return (
    <section className='add-note'>
      <div className='inp-bg'>
        <input type='text' placeholder='enter note text' name='text' value={text} onChange={e => setText(e.target.value)}/>
      </div>
      <div className='btn-bg'>
        <button className='add-btn' onClick={handleAdd}>add</button>
      </div>
    </section>
  )
}
