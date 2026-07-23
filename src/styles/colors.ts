import blackBG from "images/global/Black-Background-Tile-2x.webp"
import whiteBG from "images/global/White-Background-Tile-2x.webp"

const colors = {
  // Mains
  trueBlack: "#000000",
  mainBlack: "#121613",
  mainGreen: "#2BEE4B",
  mainWhite: "#fafffa",
  trueWhite: "#ffffff",

  // New Form Green
  green800: "#0a761c",
  green700: "#0da527",
  green600: "#11d432",
  green500: "#2bee4b",
  green400: "#5af273",
  green300: "#73f288",
  green200: "#a2f6b0",

  // Blacks
  black800: "#121613",
  black700: "#232924",
  black600: "#2e3830",
  black500: "#3a463c",
  black400: "#455448",
  black300: "#516254",
  black200: "#5c7060",

  // Whites
  white700: "#b9c1b9",
  white600: "#c8d2c8",
  white500: "#dfe7df",
  white400: "#edf3ed",
  white300: "#f0f6f0",
  white200: "#fafffa",

  // Backgrounds
  backgroundBlack: `background: url(${blackBG.src}); background-color: #121613;`,
  backgroundWhite: `background: url(${whiteBG.src}); background-color: #fafffa; background-size:200px;`,
}

export default colors
