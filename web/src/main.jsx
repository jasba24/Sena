import React, { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./components/styles/index.css"
import { AuthProvider } from "./context/AuthContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
