import React from "react"
import "../components/styles/home.css"
import { Link } from "react-router-dom"
import LoginForm from "../components/loginForm"

function Login() {
  return (
    <div className="form-container">
      <div>
        <h1 className="red-title">Iniciar Sesión</h1>
        <LoginForm></LoginForm>
      </div>
      <div>
        <h1 className="red-title">Registrate</h1>
        <LoginForm register={true}></LoginForm>
      </div>
    </div>
  )
}
export default Login
