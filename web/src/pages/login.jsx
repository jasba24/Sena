import React, { useState } from "react"
import "../components/styles/home.css"
import LoginForm from "../components/loginForm"

function Login() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  if (errorMessage) {
    return <div className="error">{errorMessage}</div>
  }

  if (user) {
    return <p>Usuario logueado correctamente</p>
  }

  return (
    <div className="form-container">
      <div>
        <h1 className="red-title">
          Si eres nuevo <br /> Registrate
        </h1>
        <LoginForm
          register={true}
          handleErrorMessage={(error) => setErrorMessage(error)}
          handleUser={(user) => setUser(user)}
        ></LoginForm>
      </div>
      <div>
        <h1 className="red-title">
          Si ya tienes cuenta <br /> Inicia Sesión
        </h1>
        <LoginForm
          handleErrorMessage={(error) => setErrorMessage(error)}
          handleUser={(user) => setUser(user)}
        ></LoginForm>
      </div>
    </div>
  )
}

export default Login
