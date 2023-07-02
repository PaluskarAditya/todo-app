import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import { clear } from '../features/notes/noteSlice'

export default function Nav() {
  const { user } = useSelector(state => state.auth)
  const disp = useDispatch()

  const handleLogout = () => {
    console.log('logging out...')
    disp(logout())
    localStorage.clear()
    disp(clear())
  }
  
  return (
    <nav id='nav'>
      <ul>
        {
          user ? <div className='nav-bg'>
            <button className='lgn-btn' onClick={handleLogout}>logout</button>
          </div> : 
          <><div className='nav-bg'>
            <li>
              <Link to='/'>home</Link>
            </li>
          </div>
            <div className='nav-bg'>
              <li>
                <Link to='/signin'>signin</Link>
              </li>
            </div>
            <div className='nav-bg'>
              <li>
                <Link to='/signup'>signup</Link>
              </li>
            </div></>
        }
      </ul>
    </nav>
  )
}
