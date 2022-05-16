import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { auth } from '../database/firebase'

export const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) throw new Error('there is not auth provider')
  return context
}

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(false)

  const signup = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  const login = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
  }

  const googleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider);
  }

  const logout = () =>
    signOut(auth)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // const {email, displayName, uid} = user
        setUser(currentUser)
      } else {
        setUser(null)
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <authContext.Provider value={{ signup, login, user, googleSignIn, logout }}>
      {children}
    </authContext.Provider>
  )
}
export default UserProvider