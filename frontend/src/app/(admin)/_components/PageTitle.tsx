import { FC, PropsWithChildren } from "react"
import styled from "styled-components"

export const PageTitle: FC<PropsWithChildren<{title: string}>> = ({title, children}) => {
    return (
        <Title>
            <TitleText>
            {title}
            </TitleText>
            <ChildrenWrapper>
                {children}
            </ChildrenWrapper>
        </Title>
    )
}

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    margin-top: 24px;
`

const TitleText = styled.h1`

`

const ChildrenWrapper = styled.div`
    display: flex;
    align-items: baseline;
    height: 44px;
`