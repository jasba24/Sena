import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { vi } from "vitest"
import * as orderService from "../../services/orders"
import { AuthProvider } from "../../context/AuthContext"

vi.mock("../../services/orders", () => ({
  getOrderById: vi.fn(),
  updateOrder: vi.fn(),
  setToken: vi.fn(),
}))

vi.stubGlobal("localStorage", {
  getItem: vi.fn(() => JSON.stringify({})),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
})

import Order from "../order"

function renderWithRoute(path = "/order/123") {
  vi.stubGlobal("localStorage", {
    getItem: vi.fn(() => JSON.stringify({ token: "mock-token" })),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  })

  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/order/:id" element={<Order />} />
      </Routes>
    </MemoryRouter>
  )
}

describe("Order View", () => {
  test("show Login if there is no user", async () => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn((key) => {
        if (key === "loggedUser") return null // 👈 Simula que no hay usuario
        return JSON.stringify({})
      }),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    })

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/order/123"]}>
          <Routes>
            <Route path="/order/:id" element={<Order />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    )
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /inicia sesión/i })
      ).toBeVisible()
    })
  })

  test("show message if order is not found", async () => {
    orderService.getOrderById.mockResolvedValue(null)

    renderWithRoute("/order/123")
    await waitFor(() =>
      expect(screen.getByText("Pedido no encontrado")).toBeInTheDocument()
    )
  })

  test("render products of the order", async () => {
    orderService.getOrderById.mockResolvedValue({
      _id: "123",
      client: "Johan",
      products: [
        {
          _id: "p1",
          image: {
            name: "Zapato",
            price: "$100",
            data: { data: [72, 101, 108, 108, 111] },
            _id: "img1",
          },
        },
      ],
    })

    renderWithRoute("/order/123")

    await waitFor(() => {
      expect(screen.getByText("Pedido de Johan")).toBeInTheDocument()
      expect(screen.getByText("$100")).toBeInTheDocument()
      expect(screen.getByRole("img")).toHaveAttribute("alt", "Zapato")
      expect(screen.getByText("Eliminar producto")).toBeInTheDocument()
    })
  })

  test("render input when clicking the 'Modificar cliente' button", async () => {
    orderService.getOrderById.mockResolvedValue({
      _id: "123",
      client: "Johan",
      products: [],
    })

    renderWithRoute("/order/123")

    const button = await screen.findByText("Modificar cliente")
    fireEvent.click(button)

    expect(
      screen.getByPlaceholderText("Nombre del cliente")
    ).toBeInTheDocument()
  })
})
