import { Route,Routes,Navigate } from "react-router-dom"
import Auth from "../pages/Auth"
import Dashboard from "../pages/Dashboard"
import ProtectedRoute from "./ProtectedRoute"

const AppRoutes = () => {
  return (
    <Routes>

        <Route path="/" element={<Navigate to="/auth" replace/>}></Route>
        
        <Route path="/auth" element={<Auth/>}></Route>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
          }>

        </Route>

    </Routes>
  )
}

export default AppRoutes