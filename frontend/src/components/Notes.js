import React, { useEffect } from 'react'
import Note from './Note'
import { useDispatch, useSelector } from 'react-redux'
import { getNotes } from '../features/notes/noteSlice'

export default function Notes() {
  const disp = useDispatch()
  useEffect(()=>{
    disp(getNotes())
  }, [])
  const { all } = useSelector(state => state.notes)
  return (
    <section className='notes'>
      {
        all.length > 0 ? all.map(note => <Note text={note.text} />) : <div className='home'><h1>you have no notes</h1></div>
      }
    </section>
  )
}
