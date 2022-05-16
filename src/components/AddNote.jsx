import React, { useState } from 'react'
import { db } from '../database/firebase'
import { collection, addDoc } from 'firebase/firestore'
import Modal from './Modal'
import { auth } from '../database/firebase'

const AddNote = ({ onClose, open, }) => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('sin texto')
      return
    }
    try {
      const user = auth.currentUser;
      const uid = user.uid;
      await addDoc(collection(db, 'notes'), {
        title: title,
        description: description,
        uid: uid,
        date: new Date()
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div>
      <Modal modalLable='Agregar Nota' onClose={onClose} open={open}>
        <form onSubmit={handleSubmit} className='addNote' name='addNote'>
          <input
            type='text'
            name='title'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder='Ingrese título' />
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Escribe tu nota'
            value={description}></textarea>
          <button type='submit'>Guardar</button>
        </form>
      </Modal>
    </div>
  )
}
export default AddNote