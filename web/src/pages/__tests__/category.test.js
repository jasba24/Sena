import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Category from "../category"
import { vi } from "vitest"
import { useCategories } from "../../context/CategoryContext"

vi.mock("../../context/CategoryContext", () => ({
  useCategories: vi.fn(),
}))

function mockUseCategories({
  categories = {},
  setCategories = vi.fn(),
  loading = false,
}) {
  useCategories.mockReturnValue({
    categories,
    setCategories,
    loading,
  })
}

describe("Category View", () => {
  beforeEach(() => {
    mockUseCategories({
      categories: {
        Calzado: [{ name: "Zapatillas" }],
        Bolsos: [{ name: "Mochila" }],
      },
      setCategories: vi.fn(),
      loading: false,
    })
  })
  test("render page title", () => {
    render(
      <BrowserRouter>
        <Category />
      </BrowserRouter>
    )

    expect(screen.getByText(/Categorías/i)).toBeInTheDocument()
  })

  test("renders main categories title", () => {
    const { container } = render(
      <BrowserRouter>
        <Category />
      </BrowserRouter>
    )

    const titles = container.querySelectorAll(".category-title")
    const calzado = Array.from(titles).some((el) =>
      el.textContent.includes("Calzado")
    )
    const bolsos = Array.from(titles).some((el) =>
      el.textContent.includes("Calzado")
    )
    expect(calzado).toBe(true)
    expect(bolsos).toBe(true)
  })

  test("show ButtonsContainer if there is a user", () => {
    localStorage.setItem("loggedUser", JSON.stringify({ token: "abc123" }))
    render(
      <BrowserRouter>
        <Category />
      </BrowserRouter>
    )
    expect(screen.getByText("Agregar Categoría")).toBeInTheDocument()
  })

  test("show loading message if loading is true", () => {
    mockUseCategories({
      categories: {
        Calzado: [{ name: "Zapatillas" }],
        Bolsos: [{ name: "Mochila" }],
      },
      setCategories: vi.fn(),
      loading: true,
    })

    render(
      <BrowserRouter>
        <Category />
      </BrowserRouter>
    )

    expect(screen.getByText("Cargando categorias...")).toBeInTheDocument()
  })

  test("show categories title if loading is false", () => {
    mockUseCategories({
      categories: {
        Calzado: [{ title: "Zapatillas" }],
        Bolsos: [{ title: "Mochila" }],
      },
      setCategories: vi.fn(),
      loading: false,
    })

    render(
      <BrowserRouter>
        <Category />
      </BrowserRouter>
    )

    expect(screen.getByText("Zapatillas")).toBeInTheDocument()
    expect(screen.getByText("Mochila")).toBeInTheDocument()
  })
})
