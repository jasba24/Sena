import React from "react"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Category from "./category"
import { getCategories } from "../utils/getCategories"

describe("Category Component", () => {
  test("renders title, categories and product", () => {
    render(
      <BrowserRouter>
        <Category />
      </BrowserRouter>
    )

    expect(screen.getByText(/Categorías/i)).toBeInTheDocument()
    expect(screen.getByText(/Calzado/i)).toBeInTheDocument()

    const headings = screen.getAllByRole("heading", { name: /Bolsos/i })
    expect(headings[0]).toBeInTheDocument()

    const buttons = screen.getAllByRole("button", { name: /ver productos/i })
    expect(buttons[0]).toBeInTheDocument()

    const shoesCategories = getCategories().productCategories[0]
    shoesCategories.forEach((product) => {
      expect(screen.getByText(new RegExp(product, "i"))).toBeInTheDocument()
    })

    const bagCategories = getCategories().productCategories[1]
    bagCategories.forEach((product) => {
      const matchingElements = screen.getAllByText(new RegExp(product, "i"))
      expect(matchingElements.length).toBeGreaterThan(0)
    })
  })
  test("renders product images and their links", () => {
    render(
      <BrowserRouter>
        <Category />
      </BrowserRouter>
    )

    const imgs = screen.getAllByRole("img", { title: /Calzado/i })
    expect(imgs[0]).toHaveAttribute("title", "Calzado")
    expect(imgs[1]).toHaveAttribute("title", "Bolsos")
  })
})
