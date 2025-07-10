import zapato from "../assets/zapato2.jpeg"
import bolso from "../assets/bolso.jpeg"
import billetera from "../assets/billetera.jpeg"

export function getCategories(param) {
  if (param == 1) {
    return {
      categories: [
        ["Calzado", zapato, "#shoes", "shoes"],
        ["Bolsos", bolso, "#bag", "bag"],
        ["Otros", billetera, "#purse", "purse"],
      ],
      productCategories: [
        [
          "Bolicheros",
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
        ["Billeteras", "Correas Mujer", "Correas Hombre", "Lociones"],
      ],
    }
  } else {
    return {
      categories: [
        ["Calzado", zapato, "#shoes", "shoes"],
        ["Bolsos", bolso, "#bag", "bag"],
      ],
      productCategories: [
        [
          "Bolicheros",
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
}
