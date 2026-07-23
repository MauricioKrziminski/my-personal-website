import React from "react"

import styled from "styled-components"

import MovableBlob from "components/MovableBlob"
import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"

type SingleCardProps = {
  card: {
    stat: string
    subtext: string
  }
}

export default function SingleCard({ card }: SingleCardProps) {
  return (
    <CardHolder>
      <BlobHolder>
        <MovableBlob isFilled={false} />
      </BlobHolder>
      <Stat>{card.stat}</Stat>
      <SubText>{card.subtext}</SubText>
    </CardHolder>
  )
}

const CardHolder = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 385px;
  height: 250px;
  margin-left: 20px;
  ${media.desktop} {
    width: 26.736vw;
    height: 17.361vw;
    margin-left: 1.389vw;
  }
  ${media.tablet} {
    width: 37.598vw;
    height: 24.414vw;
    margin-left: 1.953vw;
  }
  ${media.mobile} {
    width: 77.333vw;
    height: 42.667vw;
    margin-left: 4vw;
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

const Stat = styled.h1`
  ${text.d4Editorial};
  color: ${colors.black300};

  margin-bottom: 30px;
  ${media.desktop} {
    margin-bottom: 2.083vw;
  }
  ${media.tablet} {
    margin-bottom: 2.93vw;
  }
  ${media.mobile} {
    margin-bottom: 2.667vw;
  }
`

const SubText = styled.h2`
  ${text.captionS};
  color: ${colors.black300};
  max-width: 60%;
  white-space: pre-wrap;
`
