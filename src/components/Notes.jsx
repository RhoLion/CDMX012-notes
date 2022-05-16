import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/UserProvider'
import { useHistory } from 'react-router-dom'
import { collection, doc, deleteDoc, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { db, auth } from '../database/firebase'
import AddNote from './AddNote'
import EditNote from './EditNote'
import add from '../img/add.png'
import notepad from '../img/notepad.png'
import deletenote from '../img/deletenote.png'
import editarNota from '../img/editarNota.png'
import close from '../img/close.png'

const Notes = () => {

  const [notes, setNotes] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState();

  useEffect(() => {
    const user = auth.currentUser;
    const uid = user.uid;
    const getData = query(collection(db, 'notes'), where("uid", '==', uid), orderBy('date', 'desc'))
    onSnapshot(getData, (querySnapshot) => {
      let noteArray = [];
      querySnapshot.docs.map(doc => {
        noteArray.push(
          {
            id: doc.id,
            data: doc.data()
          }
        )
      })
      setNotes(noteArray)
    })

  }, [])

  const { logout } = useAuth()
  const history = useHistory()

  const handleLogOut = async (e) => {
    e.preventDefault()
    await logout()
    history.push('/')
  }

  const handleRemove = (id) => {
    try {
      const noteRef = doc(db, 'notes', id);
      deleteDoc(noteRef)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <header>
        <section className="list-group">
          <img src={notepad} className='notepadimg' alt='notepadimg' />
          <h4 className="text-center">Notas</h4>
          <button className='addBtn'> <img src={add} className='addimg' alt='addimg' onClick={() => { setOpenAddModal(true) }} />
          </button>
          <button className="closeBtn"> <img src={close} className='closeimg' alt='addimg' onClick={handleLogOut} />
          </button>
        </section>
      </header>
      <div className='container'>
        {openAddModal && <AddNote onClose={() => setOpenAddModal(false)} open={openAddModal} />}
        {
          notes.map(note => (
            <section key={note.id}>
              <article>
                <h2>{note.data.title}</h2>
                <h3>{note.data.description}</h3>
                <section className='buttonContainer'>
                  <button
                    className='editBtn'
                    onClick={() => {
                      setOpenEditModal(true)
                      setNoteToEdit(note)
                    }}
                  >
                    <img src={editarNota} className='editNote' alt='editNote' />
                  </button>
                  <button className='deleteBtn'
                    onClick={() => handleRemove(note.id)}
                  >
                    <img src={deletenote} className='deletenote' alt='deletenote' />
                  </button>
                </section>
              </article>
            </section>
          ))
        }
        <div>
          {openEditModal &&
            <EditNote onClose={() => setOpenEditModal(false)} open={openEditModal}
              note={noteToEdit}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default Notes