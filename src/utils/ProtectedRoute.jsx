import { Navigate, Outlet } from 'react-router'

function ProtectedRoute({user, redirectTo, children}) {
  if (!user) {
    // If user is not authenticated, redirect to the login page
    console.log("User not authenticated, redirecting to login")
    console.log("Redirecting to:", redirectTo)
    return <Navigate replace to={redirectTo} />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute