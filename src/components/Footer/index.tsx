import React, { useState } from "react"

import styled from "styled-components"

import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"
import links from "utils/links"
import { useT } from "utils/i18n/useT"

import GetInTouch from "../GetInTouch"
import NavItem from "../NavItem"
import Socials from "../Socials"
import FooterBlob from "./FooterBlob"
import FooterLegal from "./FooterLegal"
import FooterNav from "./FooterNav"

type Props = {
  isDark: boolean
  hideBlob?: boolean
}

export default function Footer({ isDark, hideBlob = false }: Props) {
  const [wrapperEl, setWrapperEl] = useState<HTMLElement | null>(null)
  const t = useT()

  return (
    <Wrapper isDark={isDark} ref={ref => setWrapperEl(ref)}>
      <Email isDark={isDark}>
        <a href={links.email}>
          <NavItem
            color={isDark ? colors.mainWhite : colors.mainBlack}
            isActive
          >
            {t.footer.email}
          </NavItem>
        </a>
      </Email>
      <Touch isDark={isDark}>
        <GetInTouch darkText={!!isDark} />
      </Touch>
      <LinksWrapper>
        <FooterNav isDark={isDark} />
        <Socials hideEmail darkText={!isDark} />
      </LinksWrapper>
      <FooterLegal isDark={isDark} />
      {!hideBlob && <FooterBlob isDark={isDark} parent={wrapperEl} />}
    </Wrapper>
  )
}

const Email = styled.div<{ isDark: boolean }>`
  ${text.h5}
  grid-area: email;
  border-bottom: 1px solid
    ${({ isDark }) => (isDark ? colors.black700 : colors.white500)};

  padding-bottom: 32px;

  a {
    display: inline-block;
    width: fit-content;
  }

  ${media.mobile} {
    ${text.sub1}
    padding-bottom: 8vw;
  }
`

const Wrapper = styled.footer<{ isDark: boolean }>`
  ${props => (props.isDark ? colors.backgroundBlack : colors.backgroundWhite)};
  display: grid;
  align-items: flex-end;
  position: relative; //need to position footer blob
  z-index: 2; //above background

  ${Email} {
    color: ${props => (props.isDark ? colors.mainWhite : colors.mainBlack)};
  }

  // mapping areas to elements
  & > div:nth-child(2) {
    grid-area: touch;
    justify-self: flex-end;
  }
  & > div:nth-child(4) {
    grid-area: legal;
  }

  grid-template-areas:
    "email email  email email"
    "links   links .     touch"
    "legal legal  legal legal";
  grid-template-columns: 1fr 1fr 1fr 2fr;

  ${media.fullWidth} {
    padding: 205px 55px 55px;
    row-gap: 40px;
  }

  ${media.desktop} {
    padding: 14.236vw 3.819vw 3.819vw;
    row-gap: 2.778vw;
  }

  ${media.tablet} {
    padding: 23.438vw 4.883vw 6.836vw;
    row-gap: 2.441vw;
  }

  ${media.mobile} {
    display: flex;
    flex-direction: column;
    padding: 42.13vw 4vw 10.67vw;
    row-gap: 8vw;
  }
`

const Touch = styled.div<{ isDark: boolean }>`
  width: 100%;
  overflow: hidden;

  ${media.mobile} {
    padding-bottom: 8vw;
    border-bottom: 1px solid
      ${({ isDark }) => (isDark ? colors.black700 : colors.white500)};
  }
`

const LinksWrapper = styled.div`
  grid-area: links;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "nav social";
  align-items: end;

  ${media.mobile} {
    width: 100%;
  }
`
