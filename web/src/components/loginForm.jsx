import React from "react"

function LoginForm(props) {
  return (
    <>
      <form>
        {props.register && (
          <>
            <label className="black-title" htmlFor="user">
              Nombre
            </label>
            <input placeholder="Email" id="user" type="text" />
          </>
        )}
        <label className="black-title" htmlFor="user">
          Usuario
        </label>
        <input placeholder="Email" id="user" type="text" />
        <label className="black-title" htmlFor="password">
          Contraseña
        </label>
        <input placeholder="Contraseña" id="password" type="password" />
        <button id="buttonSubmit" className="buy-button" type="button">
          ENVIAR
        </button>
      </form>
    </>
  )
}

export default LoginForm
