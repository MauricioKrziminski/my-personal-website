import React from "react"

import styled from "styled-components"

import media from "styles/media"
import text from "styles/text"
import links, { whatsappLink } from "utils/links"
import { useT } from "utils/i18n/useT"

import ArrowLink from "./ArrowLink"

type SocialProps = {
  forwardRef?: React.RefObject<HTMLDivElement>
  hideEmail?: boolean
  hideLegal?: boolean
  darkText?: boolean
}

export default function Socials({
  forwardRef = undefined,
  hideEmail: showEmail = false,
  darkText = false,
}: SocialProps) {
  const t = useT()
  return (
    <Links ref={forwardRef}>
      {!showEmail && (
        <a href={links.email} target="_blank" rel="noreferrer">
          <ArrowLink darkText={darkText}>{t.common.email}</ArrowLink>
        </a>
      )}
      <a
        href={whatsappLink(t.contactPage.waMessage)}
        target="_blank"
        rel="noreferrer"
      >
        <ArrowLink darkText={darkText}>
          {t.contactPage.whatsapp}
        </ArrowLink>
      </a>
      <a href={links.linkedin} target="_blank" rel="noreferrer">
        <ArrowLink darkText={darkText}>{t.common.linkedin}</ArrowLink>
      </a>
      <a href={links.github} target="_blank" rel="noreferrer">
        <ArrowLink darkText={darkText}>{t.common.github}</ArrowLink>
      </a>
    </Links>
  )
}

const Links = styled.div`
  ${text.sub3};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-area: social;

  gap: 25px;
  ${media.desktop} {
    gap: 1.736vw;
  }
  ${media.tablet} {
    gap: 2.441vw;
  }
  ${media.mobile} {
    gap: 6.67vw;
  }
`
