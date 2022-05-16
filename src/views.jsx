import React from 'react'
import Home from '../src/components/Home'
import Notes from '../src/components/Notes'
import SignIn from '../src/components/SignIn'
import UserProvider from '../src/context/UserProvider'
import { ProtectedRoute } from './components/ProtectedRoute'
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

const views = () => {

    return (
        <UserProvider>
            <Router>
                <Route exact path='/notes' >
                    <ProtectedRoute>
                        <Notes />
                    </ProtectedRoute>
                </Route>
                <Route exact path='/signin'>
                    <SignIn />
                </Route>
                <Route exact path='/' >
                    <Home />
                </Route>
            </Router>
        </UserProvider>
    )
}

export default views