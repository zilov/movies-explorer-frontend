import { Navigate } from "react-router-dom"

const ProtectedRoute = ({element, states}) => {
  return (states.loggedIn ? element : <Navigate to="/signin"/>)
}

export default ProtectedRoute;