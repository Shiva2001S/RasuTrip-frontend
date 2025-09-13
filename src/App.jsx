import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'

function App() {

  return (
    <>
      <Routes>
        <Route exact='true' path='/home' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
