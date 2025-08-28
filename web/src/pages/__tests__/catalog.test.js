import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import Catalog from "../catalog"

describe("Catalog View", () => {
  test("renders CatalogList if category is valid", () => {
    render(
      <MemoryRouter initialEntries={["/catalog/Deportivos"]}>
        <Routes>
          <Route path="/catalog/:category" element={<Catalog />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByRole("main")).toBeInTheDocument()
  })

  test("displays error if the category is invalid", () => {
    render(
      <MemoryRouter initialEntries={["/catalog/invalid"]}>
        <Routes>
          <Route path="/catalog/:category" element={<Catalog />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText(/pagina no encontrada/i)).toBeInTheDocument()
  })
})
