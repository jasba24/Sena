import React, { useState } from "react"
import { login } from "../services/login"
import { setToken } from "../services/images"
import { createUser } from "./../services/users"
import { useNavigate } from "react-router-dom"

function LoginForm({ register, handleErrorMessage, handleUser }) {
  const navigate = useNavigate()
  const [action, setAction] = useState(register ? "SignUp" : "Login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [submitMessage, setSubmitMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    if (action === "Login") {
      try {
        const user = await login({ username, password })
        window.localStorage.setItem("loggedUser", JSON.stringify(user))
        setToken(user.token)
        handleUser(user)
        setUsername("")
        setPassword("")
        navigate("/")
      } catch (e) {
        handleErrorMessage("Wrong credentials")
        setTimeout(() => {
          handleErrorMessage(null)
        }, 5000)
      }
    } else if (action === "SignUp") {
      try {
        console.log(username, name, password)
        const user = await createUser({ username, password, name })
        window.localStorage.setItem("createdAppUser", JSON.stringify(user))
        setAction("Login")
        setUsername("")
        setPassword("")
        setName("")
        setSubmitMessage("Registro de usuario exitoso")
        setTimeout(() => {
          setSubmitMessage(null)
        }, 5000)
      } catch (err) {
        console.log(err)
        handleErrorMessage(err.message)
        setTimeout(() => {
          handleErrorMessage(null)
        }, 5000)
      }
    }
  }

  return (
    <>
      <form onSubmit={(ev) => handleLogin(ev)}>
        {register && (
          <>
            <label className="black-title" htmlFor="name">
              Nombre
            </label>
            <input
              placeholder="Nombre"
              id="name"
              type="text"
              onChange={({ target }) => setName(target.value)}
              value={name}
              required
            />
          </>
        )}
        <label
          className="black-title"
          htmlFor={register ? "registerUser" : "user"}
        >
          Usuario
        </label>
        <input
          placeholder="Email"
          id={register ? "registerUser" : "user"}
          type="email"
          onChange={({ target }) => setUsername(target.value)}
          value={username}
          required
        />
        <label
          className="black-title"
          htmlFor={register ? "registerPassword" : "password"}
        >
          Contraseña
        </label>
        <input
          placeholder="Contraseña"
          id={register ? "registerPassword" : "password"}
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
