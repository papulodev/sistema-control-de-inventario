import { Route, Routes } from 'react-router'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ProtectedRoute from '../utils/ProtectedRoute'
import { useUserAuth } from '../hooks/useUserAuth'
import Register from '../pages/Register'

function AppRoutes() {

  const user = useUserAuth()  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute user={user} redirectTo={"/login"} />} >
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes