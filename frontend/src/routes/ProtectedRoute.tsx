import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps{
    children: JSX.Element;
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const token = localStorage.getItem("access_token");

  if(!token) {
    return <Navigate to="/" replace/>;
  }
  return (
    children
  )
}

export default ProtectedRoute