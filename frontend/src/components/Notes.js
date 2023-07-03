import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editNote, getNotes } from '../features/notes/noteSlice'
import { remNote } from './../features/notes/noteSlice';
import Note from './Note';
import EditNote from './EditNote';
import { BarLoader } from 'react-spinners'

export default function Notes() {
  const disp = useDispatch()
  const [editnote, setNote] = useState({})
  const [newText, setNew] = useState('')
  const [id, setId] = useState()
  const { all, isLoading } = useSelector(state => state.notes)

  const handleSave = () => {
    const info = {
      id,
      text: newText
    }
    disp(editNote(info))
    document.getElementById('edit-note').style.display = 'none'
    setTimeout(() => {
      disp(getNotes())
    }, 100);
  }

  useEffect(() => {
    disp(getNotes())
  }, [disp])

  const handleDel = (id) => {
    disp(remNote(id))
  }

  const handleEdit = (note) => {
    setNote(note)
    setId(note._id)
    setNew(note.text)
    document.getElementById('edit-note').style.display = 'flex'
  }

  const close = () => {
    document.getElementById('edit-note').style.display = 'none'
  }


  return (
    <>
      <section className='notes'>
        {
          isLoading === true ? <div className='home'><BarLoader color="black" /></div> :
            all.length > 0 ? all.map(note => {
              return <>
                <div className='bg'>
                  <div className='note-item'>
                    <h1>{note.text}</h1>
                    <div className='actions'>
                      <div className='act-bg'>
                        <button className='note-btn' id={note._id} onClick={() => handleEdit(note)}>edit</button>
                        {/* <EditNote id={note._id} text={note.text} /> */}
                      </div>
                      <div className='act-bg'>
                        <button className='note-btn' onClick={() => handleDel(note._id)} >delete</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div id='edit-note'>
                  <div className='edit'>
                    <span onClick={close}><strong>x</strong></span>
                    <h1>note id :- {id}</h1>
                    <div className='edit-btns'>
                      <div className='form-bg margin'>
                        <input type='text' placeholder='enter new text' value={newText} onChange={e => setNew(e.target.value)} />
                      </div>
                      <div className='lgn-bg'>
                        <button className='lgn-btn' onClick={handleSave} >save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }) : <div className='home'><h1>you have no notes</h1></div>
        }
      </section>
    </>
  )
}
