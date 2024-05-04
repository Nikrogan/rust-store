'use client'
import Link from "next/link"
import styled from "styled-components"
import { Button } from "../Button"
import Image from "next/image"
import { useUnit } from "effector-react"
import { $userStores } from "@/store/auth"
import { usePathname, useRouter } from "next/navigation"
import { color } from "@/config/theme"

export const WorkLayout = ({children, links}) => {
    const {user} = useUnit($userStores)
    const router = useRouter();
    const pathname = usePathname();
    const currentPage = pathname.slice(0, 6);
    return <WorkContainer>
        <Header>    
            <HeaderLogo>
                BW. INC
            </HeaderLogo>
            <HeaderMenu>
                {(currentPage !== '/work' && currentPage !== "/work/") && <HeaderLink href={'/work'}>Работа</HeaderLink>}
                {(currentPage === '/work' || currentPage === "/work/") && <HeaderLink href={'/admin'}>Админка</HeaderLink>}
                <Balance>{user.balance} BW</Balance>
                <Image src={user.avatarUrl} alt="UserImage" width={40} height={40}/>
                <Button onClick={() => router.replace('/shop')}>Выйти</Button>
            </HeaderMenu>
        </Header>
        <Main>
        <SideBar>
            {links.map((link) => <>
            {link.subtitle ? <Subtitle>{link.subtitle}</Subtitle> : null}
            <SidebarLink href={link.href}>{link.title}</SidebarLink>
            </>)}
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
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #424242;
    padding-right: 20px;
`

const Content = styled.div`
    padding: 24px;
    width: 100%;
    background: ${color.primary}
`

const Main = styled.div`
    display: flex;
    height: 100%;

`

const HeaderLogo = styled.div`
    width: 168px;
    display: flex;
    height: 50px;
    font-size: 32px;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-weight: 800;
    user-select: none;
    color: ${color.accent}
`

const SidebarLink = styled(Link)`
    text-decoration: none;
    color: white;
    transition: all 0.4s;

    & + & {
    margin-top: 8px;
    }

    &:hover {
    transform: scale(1.02)
    }
`

const Subtitle = styled.div`
  color: rgb(84, 84, 84);
  margin-top: 12px;
  margin-left: -4px;
  font-size: 14px;
`

const HeaderMenu = styled.div`
    display: flex;
    align-items: center;
    button {
        margin-left: 6px;
    }
`

const Balance = styled.div`
    margin-right: 4px;
    font-weight: 700;
`

const HeaderLink = styled(Link)`
    color: white;
    text-decoration: none;
    margin-right: 8px;

    &:hover {
        color: ${color.accent}
    }
`