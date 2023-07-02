import React from 'react'
import { useDispatch } from 'react-redux';
import { remNote } from './../features/notes/noteSlice';

export default function Note(props) {
  const { text, note } = props
  const disp = useDispatch()
  const handleDel = (id) => {
    disp(remNote(id))
  }

  return (
    <div className='bg'>
      <div className='note-item'>
        <h1>{text}</h1>
        <div className='actions'>
          <div className='act-bg'>
            <button className='note-btn'>edit</button>
          </div>
          <div className='act-bg'>
            <button className='note-btn' onClick={()=>handleDel(note._id)} >delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}
