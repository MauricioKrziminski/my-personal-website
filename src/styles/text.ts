import media from "./media"

export const fonts = {
  primary: "font-family: 'TWK Lausanne';",
  mondwest: "font-family: 'PP Mondwest';",
  editorial: "font-family: 'Editorial New';",
}

const text = {
  h1: `
    ${fonts.primary}
    font-style: normal;
    font-weight: 550;
    font-size: 360px;
    line-height: 90%;
    letter-spacing: -0.06em;
    ${media.desktop} {
      font-size: 25vw;
    }
    ${media.tablet} {
      font-size: 35.156vw;
    }
    ${media.mobile} {
      font-size: 96vw;
    }
  `,
  h2: `
    ${fonts.primary}
    font-style: normal;
    font-weight: 550;
    font-size: 244px;
    line-height: 100%;
    letter-spacing: -0.06em;  
    ${media.desktop} {
      font-size: 16.944vw;
    }
    ${media.tablet} {
      font-size: 23.828vw;
    }
    ${media.mobile} {
      font-size: 65.067vw;
    }
  `,
  h3: `
    ${fonts.primary}
    font-style: normal;
    font-weight: 550;
    font-size: 155px;
    line-height: 100%;
    letter-spacing: -0.04em;
    ${media.desktop} {
     font-size: 10.764vw;
    }
    ${media.tablet} {
     font-size: 15.14vw;
    }
    ${media.mobile} {
     font-size: 41.333vw;
    }
  `,
  h4: `
    ${fonts.primary}
    font-style: normal;
    font-weight: 550;
    font-size: 96px;
    line-height: 100%;
    letter-spacing: -0.02em;
    ${media.desktop} {
      font-size: 6.667vw;
    }
    ${media.tablet} {
      font-size: 9.375vw;
    }
    ${media.mobile} {
      font-size: 25.6vw;
    }
  `,
  h5: `
    ${fonts.primary}
    font-style: normal;
    font-weight: 550;
    font-size: 72px;
    line-height: 100%;
    letter-spacing: -0.02em;
    ${media.desktop} {
      font-size: 5vw;
    }
    ${media.tablet} {
      font-size: 7.031vw;
    }
    ${media.mobile} {
      font-size: 19.2vw;
    }
  `,
  h6: `
    ${fonts.primary}
    font-style: normal;
    font-weight: 550;
    font-size: 42px;
    line-height: 100%;
    letter-spacing: -0.02em;
    ${media.desktop} {
      font-size: 2.917vw;
    }
    ${media.tablet} {
      font-size: 4.102vw;
    }
    ${media.mobile} {
      font-size: 11.2vw;
    }
  `,
  sub1: `
    ${fonts.primary}
    font-style: normal;
    font-weight: 550;
    font-size: 30px;
    line-height: 100%;
    letter-spacing: -0.02em;
    ${media.desktop} {
      font-size: 2.083vw;
    }
    ${media.tablet} {
      font-size: 2.93vw;
    }
    ${media.mobile} {
      font-size: 8vw;
    }
  `,
  sub2: `
    ${fonts.primary}
    font-style: normal;
    font-weight: 550;
    font-size: 18px;
    line-height: 100%;
    letter-spacing: -0.02em;
    ${media.desktop} {
      font-size: 1.25vw;
    }
    ${media.tablet} {
      font-size: 1.758vw;
    }
    ${media.mobile} {
      font-size: 4.8vw;
    }
  `,
  sub3: `
    ${fonts.primary}
    font-style: normal;
    font-weight: 200;
    font-size: 18px;
    line-height: 100%;
    letter-spacing: -0.02em;
    ${media.desktop} {
      font-size: 1.25vw;
    }
    ${media.tablet} {
      font-size: 1.758vw;
    }
    ${media.mobile} {
      font-size: 4.8vw;
    }
  `,
  d1Mondwest: `
    ${fonts.mondwest}
    font-style: normal;
    font-weight: normal;
    font-size: 555px;
    line-height: 90%;
    letter-spacing: -0.05em;
    ${media.desktop} {
      font-size: 38.542vw;
    }
    ${media.tablet} {
      font-size: 54.199vw;
    }
    ${media.mobile} {
      font-size: 148vw;
    }
  `,
  d1Editorial: `
    ${fonts.editorial}
    font-style: normal;
    font-weight: 300; /* one step lighter than normal */
    font-size: 450px;
    line-height: 90%;
    letter-spacing: -0.02em;
    ${media.desktop} {
      font-size: 31.25vw;
    }
    ${media.tablet} {
      font-size: 43.945vw;
    }
    ${media.mobile} {
      font-size: 120vw;
    }
  `,
  d2Mondwest: `
    ${fonts.mondwest}
    font-style: normal;
    font-weight: normal;
    font-size: 295px;
    line-height: 90%;
    letter-spacing: -0.04em;
    ${media.desktop} {
      font-size: 20.486vw;
    }
    ${media.tablet} {
      font-size: 28.809vw;
    }
    ${media.mobile} {
      font-size: 78.667vw;
    }
  `,
  d2Editorial: `
    ${fonts.editorial}
    font-style: normal;
    font-weight: 300; /* one step lighter than normal */
    font-size: 240px;
    line-height: 90%;
    letter-spacing: -0.01em;
    ${media.desktop} {
      font-size: 16.667vw;
    }
    ${media.tablet} {
      font-size: 23.438vw;
    }
    ${media.mobile} {
      font-size: 64vw;
    }
  `,
  d3Mondwest: `
    ${fonts.mondwest}
    font-style: normal;
    font-weight: normal;
    font-size: 165px;
    line-height: 90%;
    letter-spacing: -0.04em;
    ${media.desktop} {
      font-size: 11.458vw;
    }
    ${media.tablet} {
      font-size: 16.113vw;
    }
    ${media.mobile} {
      font-size: 44vw;
    }
  `,
  d3Editorial: `
    ${fonts.editorial}
    font-style: normal;
    font-weight: 300; /* one step lighter than normal */
    font-size: 140px;
    line-height: 90%;
    letter-spacing: -0.02em;
    ${media.desktop} {
      font-size: 9.722vw;
    }
    ${media.tablet} {
      font-size: 13.672vw;
    }
    ${media.mobile} {
      font-size: 37.333vw;
    }
  `,
  d4Mondwest: `
    ${fonts.mondwest}
    font-style: normal;
    font-weight: normal;
    font-size: 72px;
    line-height: 90%;
    letter-spacing: -0.04em;
    ${media.desktop} {
      font-size: 5vw;
    }
    ${media.tablet} {
      font-size: 7.031vw;
    }
    ${media.mobile} {
      font-size: 19.2vw;
    }
  `,
  d4Editorial: `
    ${fonts.editorial}
    font-style: normal;
    font-weight: 300; /* one step lighter than normal */
    font-size: 60px;
    line-height: 90%;
    letter-spacing: -0.02em;
    ${media.desktop} {
      font-size: 4.167vw;
    }
    ${media.tablet} {
      font-size: 5.859vw;
    }
    ${media.mobile} {
      font-size: 16vw;
    }
  `,
  bodyL: `
    ${fonts.primary}
    font-style: normal;
    font-weight: 550;
    font-size: 16px;
    line-height: 140%;
    letter-spacing: 0.01em;
    ${media.desktop} {
      font-size: 1.111vw;
    }
    ${media.tablet} {
      font-size: 1.563vw;
    }
    ${media.mobile} {
      font-size: 4.267vw;
    }
  `,
  bodyM: `
    ${fonts.primary}
    font-style: normal;
    font-weight: 200;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: 0.01em;
    ${media.desktop} {
      font-size: 1.389vw;
    }
    ${media.tablet} {
      font-size: 1.953vw;
    }
    ${media.mobile} {
      font-size: 5.333vw;
    }
  `,
  bodyS: `
    ${fonts.primary}
    font-style: normal;
    font-weight: 200;
    font-size: 16px;
    line-height: 140%;
    letter-spacing: 0.01em;
    ${media.desktop} {
      font-size: 1.111vw;
    }
    ${media.tablet} {
      font-size: 1.563vw;
    }
    ${media.mobile} {
      font-size: 4.267vw;
    }
  `,
  bodyXS: `
    ${fonts.primary}
    font-style: normal;
    font-weight: 200;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.01em;
    ${media.desktop} {
      font-size: 0.972vw;
    }
    ${media.tablet} {
      font-size: 1.367vw;
    }
    ${media.mobile} {
      font-size: 3.733vw;
    }
  `,
  captionS: `
    ${fonts.primary}
    font-style: normal;
    font-weight: 350;
    font-size: 14px;
    letter-spacing: 0.01em;
    ${media.desktop} {
      font-size: 0.972vw;
    }
    ${media.tablet} {
      font-size: 1.367vw;
    }
    ${media.mobile} {
      font-size: 3.733vw;
    }
  `,
  buttonMain: `
    ${fonts.primary}
    font-style: normal;
    font-weight: 550;
    font-size: 11px;
    line-height: 110%;
    text-transform: uppercase;
    ${media.desktop} {
      font-size: 0.764vw;
    }
    ${media.tablet} {
      font-size: 1.27vw;
    }
    ${media.mobile} {
      font-size: 3.47vw;
    }
  `,
  m1: `
    ${fonts.primary}
    font-style: normal;
    font-weight: 550;
    font-size: 58px;
    line-height: 100%;
    letter-spacing: -0.02em;
    ${media.desktop} {
      font-size: 4.028vw;
    }
    ${media.tablet} {
      font-size: 5.664vw;
    }
    ${media.mobile} {
      font-size: 15.467vw;
    }
  `,
  mobileVennTextMondwest: `
    ${fonts.mondwest}
    font-style: normal;
    font-weight: normal;
    font-size: 8.8vw;
    line-height: 90%; 
    `,
  mobileVennTextEditorial: `
    ${fonts.editorial}
    font-style: normal;
    font-weight: 300;
    font-size: 7.733vw;
    line-height: 90%;
  `,
}

export const strokeText = `
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  background-size: 100%;
  background-clip: text;
  -webkit-text-stroke-width: 0.07vw;
`
export const strokeTextTransparent = `
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  background-size: 100%;
  background-clip: text;
  -webkit-text-stroke-width: 0.07vw;
`

export const transparentText = `
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  background-size: 100%;
  background-clip: text;
 
`

export default text
