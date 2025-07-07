//import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router';
import SingInForm from './components/singIn';
import SingUpForm from './components/singup';
import Header from './components/header';

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='' element={<SingInForm />} />
            <Route path='sing-up' element={<SingUpForm />} />
            <Route path='profile' element={
              <>
                <Header active="profile"/>
                <div>PROFILE</div>
              </>} />
            <Route path='task-lists' element={
              <>
                <Header active="task-lists"/>
                <div>TASK-MANAGER</div>
              </>} />
            <Route path='task-board' element={
              <>
                <Header active="task-board"/>
                <div>TASK-BOARD</div>
              </>} />
        </Routes>
    </BrowserRouter>  
  )
}

export default App
