import React, { useState } from "react"
import { login } from "../../services/login"
import { setToken } from "../../services/images"
import { useNavigate } from "react-router-dom"

function LoginForm({ handleErrorMessage }) {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [submitMessage, setSubmitMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login({ username, password })
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setToken(user.token)
      setUsername("")
      setPassword("")
      setSubmitMessage("Inicio de sesión Exitoso")
      navigate("/")
    } catch (e) {
      handleErrorMessage("Wrong credentials")
      setTimeout(() => {
        handleErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <form onSubmit={(ev) => handleLogin(ev)}>
        <label className="black-title" htmlFor="user">
          Usuario
        </label>
        <input
          placeholder="Email"
          id="user"
          type="email"
          onChange={({ target }) => setUsername(target.value)}
          value={username}
          required
        />
        <label className="black-title" htmlFor="password">
          Contraseña
        </label>
        <input
          placeholder="Contraseña"
          id="password"
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
          required
        />
        <button id="buttonSubmit" className="buy-button" type="submit">
          ENVIAR
        </button>
      </form>
      {submitMessage && <div className="submitMessage">{submitMessage}</div>}
    </>
  )
}

export default LoginForm
