import zapato from "../assets/zapato2.jpeg"
import bolso from "../assets/bolso.jpeg"

export function getCategories() {
  return {
    categories: [
      ["Calzado", zapato, "#shoes", "shoes"],
      ["Bolsos", bolso, "#bag", "bag"],
    ],
    productCategories: [
      [
        "Deportivos",
        "Mocasines",
        "Plataformas",
        "Sandalias",
        "Suecos",
        "Tacones",
      ],
      [
        "Bolsos",
        "Carriel",
        "Tulas",
        "Bolsos de Mano",
        "Mochila Wayuu",
        "Morral de Tela",
      ],
    ],
  }
}
