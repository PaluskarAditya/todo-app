import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { remNote } from './../features/notes/noteSlice';
import EditNote from './EditNote';

export default function Note(props) {
  const { text, note } = props
  const disp = useDispatch()
  const handleDel = (id) => {
    disp(remNote(id))
  }

  const [id, setId] = useState()

  const handleEdit = (e) => {
    console.log(e.target.id)
    setId(e.target.id)
  }

  return (
    <>
    <EditNote id={id} text={note.text} />
      <div className='bg'>
        <div className='note-item'>
          <h1>{text}</h1>
          <div className='actions'>
            <div className='act-bg'>
              <button className='note-btn' id={note._id} onClick={handleEdit}>edit</button>
            </div>
            <div className='act-bg'>
              <button className='note-btn' onClick={() => handleDel(note._id)} >delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
