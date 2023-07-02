import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const disp = useDispatch()
  const nav = useNavigate()
  const [ cred, setCred ] = useState({uname: "", pass: ""})
  const user = localStorage.getItem('user')

  const change = (e) => {
    setCred({...cred, [e.target.name]: e.target.value})
  }

  useEffect(()=>{
    if(user) {
      nav('/')
    }
  }, [user])

  const handleSub = (e) => {
    e.preventDefault()
    console.log('form submitted...', cred)
    disp(login(cred))
    disp(reset())
    nav('/')
  }

  return (
    <section className='login'>
      <div className='login-bg'>
        <form onSubmit={handleSub}>
          <h1>Signin</h1>
          <div className='form-bg margin'>
            <input type='text' placeholder='username' name='uname' onChange={change}/>
          </div>
          <div className='form-bg margin'>
            <input type='password' placeholder='password' name='pass' onChange={change}/>
          </div>
          <div className='lgn-bg'>
            <button className='lgn-btn' type='submit'>signin</button>
          </div>
        </form>
      </div>
    </section>
  )
}
