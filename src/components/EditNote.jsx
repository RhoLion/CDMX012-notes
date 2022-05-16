import Modal from "./Modal"
import React, { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../database/firebase'

function EditNote({ open, onClose, note }) {

  const [title, setTitle] = useState(note.data.title)
  const [description, setDescription] = useState(note.data.description)
  const [id, setId] = useState(note.id)

  const handleUpdate = async (e) => {
    e.preventDefault()
    const DocRef = doc(db, 'notes', id)
    try {
      await updateDoc(DocRef, {
        title: title,
        description: description
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Modal modalLable='Editar Nota' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='addNote'>
        <input
          type='text'
          name='title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}>
        </textarea>
        <button type='submit'>Editar</button>
      </form>
    </Modal>
  )
}

export default EditNote
