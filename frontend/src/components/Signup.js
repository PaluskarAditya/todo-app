import React, { useEffect, useState } from 'react'
import { register, reset } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const disp = useDispatch()
  const nav = useNavigate()
  const [cred, setCred] = useState({ uname: "", email: "", pass: "" })
  const change = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }
  const handleSub = (e) => {
    e.preventDefault()
    console.log('form submitted...', cred)
    disp(register(cred))
    nav('/')
  }

  const user = localStorage.getItem('user')

  useEffect(() => {
    if (user) {
      nav('/')
    }
  })

  return (
    <section className='login'>
      <div className='login-bg'>
        <form onSubmit={handleSub}>
          <h1>Signup</h1>
          <div className='form-bg margin'>
            <input type='text' placeholder='username' name='uname' onChange={change} />
          </div>
          <div className='form-bg margin'>
            <input type='email' placeholder='email' name='email' onChange={change} />
          </div>
          <div className='form-bg margin'>
            <input type='password' placeholder='password' name='pass' onChange={change} />
          </div>
          <div className='lgn-bg'>
            <button className='lgn-btn' type='submit'>signup</button>
          </div>
        </form>
      </div>
    </section>
  )
}
