import { Navigate, Outlet } from 'react-router'

function ProtectedRoute({user, redirectTo, children}) {
  if (!user) {
    return <Navigate replace to={redirectTo} />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute