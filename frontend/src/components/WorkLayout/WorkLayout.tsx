'use client'
import Link from "next/link"
import styled from "styled-components"

export const WorkLayout = ({children}) => {
    return <WorkContainer>
        <Header>    
            <HeaderLogo>
                BW. INC 
            </HeaderLogo>
            <Link href='/admin'>В админскую</Link>
        </Header>
        <Main>
        <SideBar>
            <SidebarLink href='/work/reports'>Репорты</SidebarLink>
            <SidebarLink href='/work/bans'>Баны</SidebarLink>
        </SideBar>
        <Content>
            {children}
        </Content>
        </Main>

    </WorkContainer>
}

const WorkContainer = styled.div`
    height: 100vh;
`

const SideBar = styled.div`
    min-width: 220px;
    background: #1a1a1a;
    border-right: 1px solid #424242;
    display: flex;
    flex-direction: column;
    padding: 32px 32px 0;
`

const Header = styled.div`
    height: 50px;
    background: #1a1a1a;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #424242;
`

const Content = styled.div`
    padding: 24px;
`

const Main = styled.div`
    display: flex;
    height: 100%;

`

const HeaderLogo = styled.div`
    width: 128px;
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
`

const SidebarLink = styled(Link)`
    text-decoration: none;
    color: white;

    & + & {
        margin-top: 8px;
    }
`