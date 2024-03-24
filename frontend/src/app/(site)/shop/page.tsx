'use client';

import Link from "next/link";
import styled from "styled-components";


const Title = styled.h2`
  font-size: 64px;
`

const StyledLink = styled(Link)`
  font-size: 16px;
  background: rgb(255 255 255 / 10%);
  max-width: 502px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 12px;
  transition: transform 0.6s;
  &:hover {
    transform: scale(1.05);
  }

  & + & {
    margin-top: 20px;
  }
`

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  & + & {
    margin-left: 20px;
  }
`

const FlexContainer = styled.div`
  display: flex;
  margin-top: 32px;
`

const SelectShopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 178px);
`

export default function Shop() {
  return (
    <SelectShopContainer>
      <Title>Выберите сервер</Title>
      <FlexContainer>
        <Flex>
          <StyledLink href={`/shop/${1}`}>BLACKWOOD RUST #1 [ X3/MAX3] FRIDAY</StyledLink>
          <StyledLink href={`/shop/${3}`}>BLACKWOOD RUST #3 [ X2/MAX5 | SEMI-CLASSIC ] MONDAY </StyledLink>
        </Flex>
        <Flex>
        <StyledLink href={`/shop/${2}`}>BLACKWOOD RUST #2 [ CLASSIC | NO LIMIT ] FRIDAY</StyledLink>
          <StyledLink href={`/shop/${4}`}>BLACKWOOD RUST #4 [ X5/MAX4] MONDAY</StyledLink>
        </Flex>
      </FlexContainer>
    </SelectShopContainer>
  )
}