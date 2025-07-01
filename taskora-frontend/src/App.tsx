//import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.scss'
import TestBuild from './components/test';

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='' element={<div>TASKORA</div>} />
            <Route path='test' element={<TestBuild />} />
        </Routes>
    </BrowserRouter>  
  )
}

export default App
