'use client'
import { $userStores } from "@/store/auth"
import { AppShell, Box, Burger, Flex, Image, NavLink } from "@mantine/core"
import { useUnit } from "effector-react"
import { theme } from "../theme/theme"
import { ButtonWrapper } from "@/shared/ButtonWrapper/ButtonWrapper"


export const AppShellWrapper = ({children}) => {
  const {user} = useUnit($userStores)

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
          <Flex>
            <Image src={user?.avatarUrl} w={42} h={42}/>
            <ButtonWrapper>Выйти</ButtonWrapper>
          </Flex>
        </Box>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink label="Главная" href="/admin"/>
        <NavLink label="Магазины">
            <NavLink label="Добавить магазин" href="/admin/createstore"/>
            <NavLink label="BlackWood" href="/admin/store/1"/>
        </NavLink>
        <NavLink label="Профиль" href="/admin/profile"/>
        <NavLink label="FAQ"/>
        <NavLink label="Discord - сообщество"/>
        <NavLink label="Wiki"/>
        <NavLink label="Добавление сервера" href="/admin/findserver"/>
        </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
    )
}