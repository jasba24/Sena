import React from "react"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Catalog from "./catalog"

const mockImages = Array.from(
  { length: 151 },
  (_, i) => `https://firebase.mock/img-${i}.jpg`
)
vi.mock("../utils/getImages.js", () => ({
  useImages: () => mockImages,
}))

describe("Catalog component", () => {
  test("renders child component", () => {
    render(
      <BrowserRouter>
        <Catalog />
      </BrowserRouter>
    )

    const heading = screen.getByRole("heading", { name: /Bolsos en cuero/i })
    expect(heading).toBeInTheDocument()
  })

  test("renders sample firebase images from full set", () => {
    render(
      <BrowserRouter>
        <Catalog />
      </BrowserRouter>
    )
    const renderedImages = screen
      .getAllByRole("img")
      .map((img) => img.getAttribute("src"))
    expect(renderedImages).toEqual(
      expect.arrayContaining([
        "https://firebase.mock/img-0.jpg",
        "https://firebase.mock/img-45.jpg",
        "https://firebase.mock/img-150.jpg",
      ])
    )
  })
})
