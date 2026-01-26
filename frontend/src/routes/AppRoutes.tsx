import { Route,Routes,Navigate } from "react-router-dom"
import Home from "../pages/Auth"
import AuthLayout from "../components/auth/AuthLayout"
import Dashboard from "../pages/Dashboard"

const AppRoutes = () => {
  return (
    <Routes>

        <Route path="/" element={<Navigate to="/home" replace/>}></Route>
        
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>

    </Routes>
  )
}

export default AppRoutes