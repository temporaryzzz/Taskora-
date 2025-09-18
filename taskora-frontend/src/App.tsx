//⁡⁢⁣⁣IMPORTS⁡
import { BrowserRouter, Route, Routes } from 'react-router';
import SingInForm from './components/singIn';
import SingUpForm from './components/singup';
import Header from './components/header';
import TaskPage from './components/task-manager/task-page';
import { useEffect, useState } from 'react';
import ProfilePage from './components/profile/profile-page';
import { InizializateLists } from './scripts/dataTaskManager';

console.log(document.cookie)

export interface User {
  username: string;
  user_id: number;
  email: string;
}

function App() {
  const [user, setUser] = useState<User | undefined>(undefined)
<<<<<<< HEAD
  const [lists, setLists] = useState(undefined)
=======
>>>>>>> 543fad9c7cd0a9433b4e69320b93ca4204b3ab80

  useEffect(() => {
    if(user) {
      //запросы на получение списков задач и последнего открытого списка
<<<<<<< HEAD
      InizializateLists(user.user_id).then((data) => {setLists(data); console.log(data)})
      console.log(lists)
=======
>>>>>>> 543fad9c7cd0a9433b4e69320b93ca4204b3ab80
    }
  }, [user])

  return (
    <BrowserRouter>
        <Routes>
            <Route path='' element={<SingInForm setUser={setUser}/>} />
            <Route path='sing-up' element={<SingUpForm />} />
            <Route path='profile' element={
              <>
                <Header active="profile" username={user?.username}/>
                <ProfilePage />
              </>} />
            <Route path='task-lists' element={
              <>
                <Header active="task-lists" username={user?.username}/>
                <TaskPage />
              </>} />
            <Route path='task-board' element={
              <>
                <Header active="task-board" username={user?.username}/>
                <div>IN DEVELOPMENT...</div>
              </>} />
        </Routes>
    </BrowserRouter>  
  )
}

export default App
