import { Route, Routes, useNavigate } from 'react-router'
import Layout from './Layout'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Register from './pages/Register'
import { Navigate } from 'react-router'
import { useEffect } from 'react'

function App() {

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Navigate to={"/login"}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Layout/>}>
          <Route path='/dashboard' element={token ? (user?.role == "user" ? <UserDashboard/> : <AdminDashboard/> ) : <Navigate to={"/login"}/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
