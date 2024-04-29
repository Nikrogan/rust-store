'use client'
import { $userStores } from "@/store/auth"
import { AppShell, Box, Burger, Flex, Image, NavLink, useComputedColorScheme, useMantineColorScheme } from "@mantine/core"
import { useUnit } from "effector-react"
import { theme } from "../theme/theme"
import { ButtonWrapper } from "@/shared/ButtonWrapper/ButtonWrapper"
import { redirect, usePathname, useRouter } from "next/navigation"
import { useLayoutEffect } from "react"
import Link from "next/link"
import styled from "styled-components"


export const AppShellWrapper = ({children}) => {
  const {user} = useUnit($userStores);
  const pathname = usePathname();
  const router = useRouter();

  useLayoutEffect(() => {
    if(user?.role === 1 && pathname !== '/admin/bans') {
      redirect('/admin/bans')
    };
  }, [user?.role]);

  const handleClickLougoutAdmin = () => {
    router.push('/')
  };

  return (
    <AppShell
        header={{ height: 60 }}
        navbar={{
        width: 200,
        breakpoint: 'sm',
      }}
        padding="md"
    >
      <AppShell.Header p={theme.spacing.sm}>
        <Box>
          <Flex justify="space-between">
            <Image src={user?.avatarUrl} w={42} h={42}/>
            <Link href='/work'>В модераторскую</Link>
            <Flex align="center">
              <ButtonWrapper ml={theme.spacing.md} variant="outline" onClick={() => {
                handleClickLougoutAdmin()
              }}>Выйти</ButtonWrapper>
            </Flex>
          </Flex>
        </Box>
      </AppShell.Header>

      <AppShell.Navbar p="md">
          {user?.role === 2 && <StyledLink href="/admin">Главная</StyledLink>}
          {user?.role === 2 && <StyledLink href="/admin/profile">Профиль</StyledLink>}
          {user?.role === 2 && <StyledLink href="/admin/findserver">Поиск серверов</StyledLink>}
          {user?.role === 1 || user?.role === 2 &&<StyledLink href="/admin/bans">Проверки</StyledLink>}
          <Subtitle></Subtitle>
          <Subtitle>Статистика</Subtitle>
          <StyledLink href="/admin/purchases">Покупки</StyledLink>
          <StyledLink href="/admin/profit">Пополнения</StyledLink>
          <StyledLink href="/admin/expenses">Расходы</StyledLink>
          <Subtitle>Общие</Subtitle>
          <StyledLink href="/admin/sharedsettings">Настройки</StyledLink>
          <StyledLink href="/admin/products">Товары</StyledLink>
          <StyledLink href="/admin/promocodes">Промокоды</StyledLink>
          <Subtitle>Сервер</Subtitle>
          <StyledLink href="/admin/players">Игроки</StyledLink>
        </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
    )
}

const Subtitle = styled.div`
  color: rgb(84, 84, 84);
  margin-top: 12px;
  margin-left: -4px;
  font-size: 14px;
`

const StyledLink = styled(Link)`
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