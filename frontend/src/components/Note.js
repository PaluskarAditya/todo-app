import React from 'react'

export default function Note(props) {
  const { text } = props
  return (
    <div className='bg'>
      <div className='note-item'>
        <h1>{text}</h1>
        <div className='actions'>
          <div className='act-bg'>
            <button className='note-btn'>edit</button>
          </div>
          <div className='act-bg'>
            <button className='note-btn'>delete</button>
          </div>
        </div>
      </div>
    </div>

  )
}
