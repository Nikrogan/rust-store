'use client'
import { $userStores } from "@/store/auth"
import { AppShell, Box, Burger, Flex, Image, NavLink, useComputedColorScheme, useMantineColorScheme } from "@mantine/core"
import { useUnit } from "effector-react"
import { theme } from "../theme/theme"
import { ButtonWrapper } from "@/shared/ButtonWrapper/ButtonWrapper"
import { redirect, usePathname, useRouter } from "next/navigation"
import { useLayoutEffect } from "react"


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
            <Flex align="center">
              <ButtonWrapper ml={theme.spacing.md} variant="outline" onClick={() => {
                handleClickLougoutAdmin()
              }}>Выйти</ButtonWrapper>
            </Flex>
          </Flex>
        </Box>
      </AppShell.Header>

      <AppShell.Navbar p="md">
          {user?.role === 2 && <NavLink label="Главная" href="/admin"/>}
          {user?.role === 2 && <NavLink label="Профиль" href="/admin/profile"/>}
          {user?.role === 2 && <NavLink label="Поиск серверов" href="/admin/findserver"/>}
          {user?.role === 1 || user?.role === 2 &&<NavLink label="Проверки" href="/admin/bans"/>}

        </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
    )
}