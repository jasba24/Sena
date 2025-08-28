import React from "react"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Home from "../home"

describe("Home view", () => {
  test("renders title and catalog links", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    expect(screen.getByText(/Catalogos disponibles/i)).toBeInTheDocument()
    expect(screen.getByText(/Ver catalogo/i)).toBeInTheDocument()

    expect(screen.getByRole("link", { name: /Ver catalogo/i })).toHaveAttribute(
      "href",
      "/category/1"
    )
    const heroImage = screen.getByRole("img")
    expect(heroImage).toBeInTheDocument()
    expect(heroImage).toHaveAttribute(
      "src",
      expect.stringContaining("/src/assets/heroImage.png")
    )
  })
})
