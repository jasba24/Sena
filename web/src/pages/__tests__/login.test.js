import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import Login from "../login"
import { AuthProvider } from "../../context/AuthContext"

function renderWithProviders(path = "/admin/login") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/admin/login/*" element={<Login />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  )
}


describe("Login View", () => {
  beforeEach(() => {
    // Mock de localStorage
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(() => JSON.stringify({ token: "mock-token" })),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    })
  })
  test("show title and login form if the URL is /login", () => {
    renderWithProviders("/admin/login")

    expect(screen.getByText("Inicia Sesión")).toBeInTheDocument()
  })

  test("show change password form if the URL is /login/change", () => {
    renderWithProviders("/admin/login/change")

    expect(screen.getByText("Cambiar Contraseña")).toBeInTheDocument()
  })
})
