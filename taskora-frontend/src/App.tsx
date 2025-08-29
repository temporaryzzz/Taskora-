//import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router';
import SingInForm from './components/singIn';
import SingUpForm from './components/singup';
import Header from './components/header';
import TaskPage from './components/task-manager/task-page';
import { useState } from 'react';
import ProfilePage from './components/profile/profile-page';

console.log(document.cookie)

function App() {

  const [username] = useState<string>("Profile")

  return (
    <BrowserRouter>
        <Routes>
            <Route path='' element={<SingInForm />} />
            <Route path='sing-up' element={<SingUpForm />} />
            <Route path='profile' element={
              <>
                <Header active="profile" username={username}/>
                <ProfilePage />
              </>} />
            <Route path='task-lists' element={
              <>
                <Header active="task-lists" username={username}/>
                <TaskPage />
              </>} />
            <Route path='task-board' element={
              <>
                <Header active="task-board" username={username}/>
                <div>TASK-BOARD</div>
              </>} />
        </Routes>
    </BrowserRouter>  
  )
}

export default App
