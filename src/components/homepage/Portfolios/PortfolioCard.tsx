import React, { useRef, useState } from "react"

import styled from "styled-components"

import MovableBlob from "components/MovableBlob"
import Arrow from "images/global/linkArrow.svg"
import colors from "styles/colors"
import easing from "styles/easing"
import media from "styles/media"
import text from "styles/text"
import { zeroPad } from "utils/functions"

type Props = {
  company: Queries.FeaturedCompanyFragment
  number: number
}

export default function PortfolioCard({ company, number }: Props) {
  const wrapper = useRef<HTMLButtonElement>(null)
  const [hover, setHover] = useState<boolean>(false)

  const handleClick = (url: string | null) => {
    if (url) {
      window.open(url, "blank")
    }
  }

  return (
    <Wrapper
      ref={wrapper}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => handleClick(company.url)}
    >
      <BlobHolder>
        <MovableBlob isFilled={hover} />
      </BlobHolder>
      <Num>{zeroPad(number)}</Num>
      {!!company.logo && (
        <Logo
          loading="lazy"
          $isImage={!!company.image}
          src={
            company.image ??
            `https://${company.logo?.file?.url ?? ""}?fm=webp&w=500`
          }
          alt={company.logo?.description ?? "company logo"}
          width={company.logo.file?.details?.image?.width ?? ""}
          height={company.logo.file?.details?.image?.height ?? ""}
        />
      )}
      <StyledArrow />
    </Wrapper>
  )
}

const Num = styled.div`
  ${text.sub3};
  transition: color 0.3s ${easing.main};
`

const Logo = styled.img<{ $isImage: boolean }>`
  transform: translateZ(0);
  filter: ${props => (props.$isImage ? "drop-shadow(0 8px 20px rgba(0,0,0,0.35))" : `grayscale(1) saturate(100%) invert(27%) sepia(7%) saturate(1067%)
    hue-rotate(80deg) brightness(102%) contrast(83%)`)};
  height: 100%;
  width: 100%;
  object-fit: contain;

  ${media.fullWidth} {
    max-height: 96px;
    max-width: 320px;
  }

  ${media.desktop} {
    max-height: 6.67vw;
    max-width: 22.22vw;
  }

  ${media.tablet} {
    max-height: 9.38vw;
    max-width: 31.25vw;
  }

  ${media.mobile} {
    max-height: 14.4vw;
    max-width: 48.27vw;
  }
`

const Wrapper = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;

  & > * {
    pointer-events: none;
  }

  &:hover {
    cursor: pointer;

    ${Num} {
      color: ${colors.black400};
    }

    ${Logo} {
      filter: none;
    }
  }

  border-radius: 10px;
  height: 170px;
  padding: 50px 20px;
  ${media.desktop} {
    border-radius: 0.694vw;
    height: 11.806vw;
    padding: 3.472vw 1.389vw;
  }
  ${media.tablet} {
    border-radius: 0.977vw;
    height: 16.602vw;
    padding: 4.883vw 1.953vw;
  }
  ${media.mobile} {
    border-radius: 2.667vw;
    height: 24vw;
    padding: 5.333vw;
  }
`

const BlobHolder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: -1;
`

const StyledArrow = styled(Arrow)`
  width: 24px;
`
