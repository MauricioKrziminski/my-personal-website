import React, { Dispatch, SetStateAction } from "react"

import styled from "styled-components"

import ArrowSVG from "images/global/linkArrow.svg"
import media from "styles/media"
import text from "styles/text"
import { useT } from "utils/i18n/useT"
import useMedia from "utils/useMedia"

type Props = {
  href: string
  setRef?: Dispatch<SetStateAction<HTMLAnchorElement | null>>
  color: string
}

export default function Visit({ href, setRef = undefined, color }: Props) {
  const t = useT()
  const visitText = useMedia(
    t.common.visitSite,
    t.common.visitSite,
    t.common.visitSite,
    t.common.visit
  )

  return (
    <Wrapper
      color={color}
      ref={(ref: HTMLAnchorElement) => setRef && setRef(ref)}
      href={href}
      target="_blank"
      onClick={e => e.stopPropagation()}
    >
      <Text>
        {visitText}
        <Line />
      </Text>
      <Arrow />
    </Wrapper>
  )
}

const Text = styled.div`
  ${text.buttonMain}
  text-transform: uppercase;
  width: fit-content;
`

const Line = styled.div`
  height: 1px;
  width: 0%;
  position: absolute;
  bottom: -2px;
  left: 0px;
  transition: width 0.25s;
`

const Arrow = styled(ArrowSVG)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateZ(0);
  transition: transform 0.25s;

  ${media.fullWidth} {
    width: 17px;
    right: -25px;
  }

  ${media.desktop} {
    width: 1.18vw;
    right: -1.74vw;
  }

  ${media.tablet} {
    width: 1.86vw;
    right: -2.83vw;
  }

  ${media.mobile} {
    width: 5.07vw;
    right: -8vw;
  }
`

const Wrapper = styled.a<{ color: string }>`
  display: flex;
  align-items: center;
  position: relative;

  ${Line} {
    background-color: ${props => props.color};
  }

  ${Text} {
    color: ${props => props.color};
  }

  &:hover {
    ${Line} {
      width: 100%;
    }

    ${Arrow} {
      transform: translate(30%, -50%) translateZ(0);
    }
  }
`
