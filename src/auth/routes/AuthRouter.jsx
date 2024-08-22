import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPages } from "../pages/LoginPages"
import { RegisterPages } from "../pages/RegisterPages"


export const AuthRouter = () => {
  return (
    <Routes>
        <Route path="login" element={<LoginPages />} />
        <Route path="register" element={<RegisterPages />} />

        <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
