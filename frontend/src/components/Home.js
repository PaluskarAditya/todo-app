import React from 'react'
import AddNote from './AddNote'
import Notes from './Notes'
import { useSelector } from 'react-redux'

export default function Home() {
  const { user } = useSelector(state => state.auth)
  return (
    <section>
      {
        user ? <>
          <AddNote />
          <Notes />
        </> :
        <div className='home'>
          <h1>Signin / Signup to create notes</h1>
        </div>
      }
    </section>
  )
}
