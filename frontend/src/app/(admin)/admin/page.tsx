'use client'
import { AppShell, Burger, NavLink } from "@mantine/core";

export default function AdminPage () {
    return (
    <AppShell
        header={{ height: 60 }}
        navbar={{
        width: 300,
        breakpoint: 'sm',
      }}
        padding="md"
    >
      <AppShell.Header>
        <Burger
          hiddenFrom="sm"
          size="sm"
        />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink label="Главная" />
        <NavLink label="Магазины">
            <NavLink label="BlackWood"/>
        </NavLink>
        <NavLink label="Профиль"/>
        <NavLink label="FAQ"/>
        <NavLink label="Discord - сообщество"/>
        <NavLink label="Wiki"/>
        </AppShell.Navbar>
      <AppShell.Main>main</AppShell.Main>
    </AppShell>
    )
}