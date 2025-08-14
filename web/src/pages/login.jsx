import React, { useEffect, useState } from "react"
import "../components/styles/home.css"
import LoginForm from "../components/forms/loginForm"
import { useLocation } from "react-router-dom"
import ChangePasswordForm from "../components/forms/changePasswordForm"
import { setToken } from "../services/login"

function Login() {
  const [errorMessage, setErrorMessage] = useState(null)
  const user = JSON.parse(localStorage.getItem("loggedUser"))
  const location = useLocation()
  const changeParam = location.pathname.split("/")[3]

  useEffect(() => {
    if (user) {
      setToken(user.token)
    }
  })

  if (errorMessage) {
    return <div className="error">{errorMessage}</div>
  }

  return (
    <div className="form-container">
      <div>
        <h1 className="red-title">
          {changeParam ? "Cambiar Contraseña" : "Inicia Sesión"}
        </h1>
        {changeParam ? (
          <ChangePasswordForm
            handleErrorMessage={(error) => setErrorMessage(error)}
          ></ChangePasswordForm>
        ) : (
          <LoginForm
            handleErrorMessage={(error) => setErrorMessage(error)}
          ></LoginForm>
        )}
      </div>
    </div>
  )
}

export default Login
