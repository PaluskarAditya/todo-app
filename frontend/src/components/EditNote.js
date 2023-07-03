import React from 'react'

export default function EditNote(props) {
  const { id, text } = props
  const close = () => {
    document.getElementById('edit-note').style.display = 'none'
  }

  return (
    <div id='edit-note'>
      <div className='edit'>
        <h1>{id + " " + text}</h1>
        <input value={id} />
        <input value={text} />
        <button onClick={close}>close</button>
      </div>
    </div>
  )
}
