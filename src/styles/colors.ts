import blackBG from "images/global/dark-tile.webp"
import whiteBG from "images/global/light-tile.webp"

const colors = {
  // Mains
  trueBlack: "#000000",
  mainBlack: "#121110",
  mainAccent: "#FFB020",
  mainWhite: "#faf9f7",
  trueWhite: "#ffffff",

  // Accent (âmbar). accent500 é o tom da marca; os escuros existem para texto
  // pequeno sobre fundo claro, onde o accent500 não alcança contraste AA.
  accent800: "#7a4e00",
  accent700: "#a66a00",
  accent600: "#d18700",
  accent500: "#ffb020",
  accent400: "#ffc24d",
  accent300: "#ffd07a",
  accent200: "#ffe0a8",

  // Blacks
  black800: "#121110",
  black700: "#201e1b",
  black600: "#2b2825",
  black500: "#37332f",
  black400: "#443f3a",
  black300: "#524c45",
  black200: "#605951",

  // Whites
  white700: "#c0bbb4",
  white600: "#cfcac3",
  white500: "#e4e0da",
  white400: "#f1eee9",
  white300: "#f5f2ee",
  white200: "#faf9f7",

  // Backgrounds
  backgroundBlack: `background: url(${blackBG.src}); background-color: #121110;`,
  backgroundWhite: `background: url(${whiteBG.src}); background-color: #faf9f7; background-size:200px;`,
}

export default colors
