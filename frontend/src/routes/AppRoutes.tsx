import { Route,Routes,Navigate } from "react-router-dom"
import Auth from "../pages/Auth"
import Dashboard from "../pages/Dashboard"
import ProtectedRoute from "./ProtectedRoute"
import Welcome from "../pages/Welcome"

const AppRoutes = () => {
  return (
    <Routes>

        <Route path="/" element={<Navigate to="/welcome" replace/>}></Route>
        <Route path="/welcome" element={<Welcome/>}/>
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