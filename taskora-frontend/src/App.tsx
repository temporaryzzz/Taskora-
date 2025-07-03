//import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router';
import TestBuild from './components/test';
import SingInForm from './components/singIn';
import SingUpForm from './components/singup';

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='' element={<SingInForm />} />
            <Route path='sing-up' element={<SingUpForm />} />
            <Route path='test' element={<TestBuild />} />
            <Route path='profile' element={<div>PROFILE</div>} />
            <Route path='task-lists' element={<div>TASK-MANAGER</div>} />
            <Route path='board' element={<div>ONLINE-BOARD</div>} />
        </Routes>
    </BrowserRouter>  
  )
}

export default App
