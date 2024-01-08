'use client'
import { AppShell, Burger, NavLink } from "@mantine/core"
import Link from "next/link"

export const AppShellWrapper = ({children}) => {
    return (
    <AppShell
        header={{ height: 60 }}
        navbar={{
        width: 200,
        breakpoint: 'sm',
      }}
        padding="md"
    >
      <AppShell.Header>
        <Burger
          hiddenFrom="sm"
          size="sm"
        />
        <Link href="/"><div>Logo</div></Link>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink label="Главная" href="/admin" />
        <NavLink label="Магазины">
            <NavLink label="Добавить магазин" href="/admin/createstore"/>
            <NavLink label="BlackWood" href="/admin/store/1"/>
        </NavLink>
        <NavLink label="Профиль" href="/admin/profile"/>
        <NavLink label="FAQ"/>
        <NavLink label="Discord - сообщество"/>
        <NavLink label="Wiki"/>
        </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
    )
}