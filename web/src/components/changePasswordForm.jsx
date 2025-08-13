import React, { useState } from "react"
import { changePassword } from "../services/login"
import { useNavigate } from "react-router-dom"

function ChangePasswordForm() {
  const navigate = useNavigate()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden")
      return
    }
    try {
      await changePassword({ currentPassword, newPassword })
      setMessage("Contraseña actualizada correctamente")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setTimeout(() => {
        navigate("/")
      }, 3000)
    } catch (error) {
      handleErrorMessage("Wrong credentials")
      setTimeout(() => {
        handleErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="black-title" htmlFor="actual">
          Contraseña actual
        </label>
        <input
          id="actual"
          type="password"
          value={currentPassword}
          onChange={({ target }) => setCurrentPassword(target.value)}
          required
        />

        <label className="black-title" htmlFor="new">
          Nueva contraseña
        </label>
        <input
          id="new"
          type="password"
          value={newPassword}
          onChange={({ target }) => setNewPassword(target.value)}
          required
        />
        <label className="black-title" htmlFor="newConfirm">
          Confirmar nueva contraseña
        </label>
        <input
          id="newConfirm"
          type="password"
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          required
        />
        <button className="buy-button" type="submit">
          Actualizar contraseña
        </button>
        {message && <div className="submitMessage">{message}</div>}
      </form>
    </>
  )
}

export default ChangePasswordForm
