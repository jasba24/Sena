import React from 'react'
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Home from "./home"

describe("Home component", () => {
  test("renders title and catalog links", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByText(/Catalogos disponibles/i)).toBeInTheDocument()
    expect(screen.getByText(/Ver catalogo 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Ver catalogo 2/i)).toBeInTheDocument()

    expect(
      screen.getByRole("link", { name: /Ver catalogo 1/i })
    ).toHaveAttribute("href", "/category/1")
    expect(
      screen.getByRole("link", { name: /Ver catalogo 2/i })
    ).toHaveAttribute("href", "/category/2")
  })
})
