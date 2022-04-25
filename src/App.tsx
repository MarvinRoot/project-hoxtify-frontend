import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Main } from './pages/Main'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { useStore } from './pages/components/store'

function App() {
  const { updateUser } = useStore()
  function validateUser() {
    if (localStorage.token) {
      fetch('http://localhost:3001/validate', {
        headers: {
          Authorization: localStorage.token
        }
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error.message);
          } else {
            updateUser(data);
          }
        });
    }
  }

  useEffect(() => {
    validateUser()
  }, [])

  return(
    <div className="App">
      <Routes>
        <Route index element={<Navigate replace to="/sign-in" />} />
        <Route path='/sign-in' element={< SignIn />} />
        <Route path='/sign-up' element={< SignUp />} />
        <Route path='/main' element={< Main />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  )
  
}

export default App
