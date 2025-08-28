import { act } from "react-dom/test-utils"
import { render, screen, fireEvent } from "@testing-library/react"
import Shopping from "../shopping"
import { beforeEach, vi } from "vitest"
import * as orderService from "../../services/orders"

vi.mock("../../services/orders", () => ({
  createOrder: vi.fn(),
}))

vi.stubGlobal("localStorage", {
  getItem: vi.fn(),
  setItem: vi.fn(),
})

describe("Shopping View", () => {
  beforeEach(() => {
    vi.stubGlobal("window", {
      open: vi.fn(),
      location: { origin: "http://localhost" },
    })
    vi.stubGlobal("alert", vi.fn())
  })

  test("renders products from localStorage", () => {
    const mockCart = [
      { _id: "1", name: "Zapato", price: "$100", data: "base64data" },
    ]
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockCart))

    render(<Shopping />)

    expect(
      screen.getByText("Tus productos son los siguientes:")
    ).toBeInTheDocument()
    expect(screen.getByText("$100")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Zapato")
  })

  test("removes product from cart", async () => {
    const mockCart = [
      { _id: "1", name: "Zapato", price: "$100", data: "base64data" },
    ]
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockCart))

    render(<Shopping />)

    const deleteButton = screen.getByText("Eliminar producto")
    await act(async () => {
      fireEvent.click(deleteButton)
    })

    expect(screen.queryByText("$100")).not.toBeInTheDocument()
  })

  test("creates order and opens WhatsApp", async () => {
    const mockCart = [
      { _id: "1", name: "Zapato", price: "$100", data: "base64data" },
    ]
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockCart))
    orderService.createOrder.mockResolvedValueOnce({ _id: "abc123" })

    render(<Shopping />)

    const buyButton = await screen.findByText("Comprar vía WhatsApp")
    await act(async () => {
      fireEvent.click(buyButton)
    })

    expect(orderService.createOrder).toHaveBeenCalledWith(mockCart)
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining("https://wa.me/573205451804"),
      "_blank"
    )
  })

  test("shows alert on order creation error", async () => {
    const mockCart = [
      { _id: "1", name: "Zapato", price: "$100", data: "base64data" },
    ]
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockCart))
    orderService.createOrder.mockRejectedValueOnce(new Error("fail"))

    render(<Shopping />)

    const buyButton = await screen.findByText("Comprar vía WhatsApp")
    await act(async () => {
      fireEvent.click(buyButton)
    })

    expect(alert).toHaveBeenCalledWith(
      "Hubo un problema al enviar tu pedido. Intenta de nuevo."
    )
  })

  test("shows loading state while sending", async () => {
    const mockCart = [
      { _id: "1", name: "Zapato", price: "$100", data: "base64data" },
    ]
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockCart))

    orderService.createOrder.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ _id: "abc123" }), 100)
        )
    )

    render(<Shopping />)

    const buyButton = await screen.findByText("Comprar vía WhatsApp")
    fireEvent.click(buyButton)

    const loadingButton = await screen.findByText("Enviando...")
    expect(loadingButton).toBeDisabled()

    const finalButton = await screen.findByText("Comprar vía WhatsApp")
    expect(finalButton).not.toBeDisabled()
  })
})
