import { Route,Routes,Navigate } from "react-router-dom"
import Home from "../pages/Home"
import AuthLayout from "../components/auth/AuthLayout"

const AppRoutes = () => {
  return (
    <Routes>

        <Route path="/" element={<Navigate to="/home" replace/>}></Route>
        
        <Route path="/home" element={<Home/>}></Route>
        

    </Routes>
  )
}

export default AppRoutes