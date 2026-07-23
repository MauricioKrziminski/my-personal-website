import styled from "styled-components"

import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  place-items: center;
`

export const Text = styled.h2`
  color: ${colors.mainWhite};
  ${text.d4Mondwest}
  position: relative;
  z-index: 3;
  text-align: center;
  font-size: 45px;

  ${media.fullWidth} {
    width: 70%;
  }

  ${media.desktop} {
    font-size: 4.167vw;
    width: 90%;
  }

  ${media.tablet} {
    font-size: 5.371vw;
    width: 90%;
  }

  ${media.mobile} {
    ${text.mobileVennTextMondwest}
    width: 90%;
  }
`

export const BeforeText = styled.h2`
  color: ${colors.white600};
  ${text.d4Editorial}
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 3;
  transform: translate(-50%, -50%);
  padding-top: 20px;

  ${media.desktop} {
    padding-top: 1.389vw;
  }
  ${media.tablet} {
    padding-top: 1.953vw;
  }
  ${media.mobile} {
    padding-top: 5.333vw;
    ${text.mobileVennTextEditorial}
  }
`

export const Image = styled.img<{ alt: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.08;
  z-index: 2;
`
