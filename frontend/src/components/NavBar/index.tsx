'use client'
import { Flex, Button, Menu, Image, Loader, MenuItem, ActionIcon, useMantineColorScheme, useComputedColorScheme } from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import Link from "next/link"
import { UserAvatar } from "../UserAvatar"
import { theme } from "../theme/theme"
import NextImage from 'next/image';
import bwtextlogo from '../../../public/bwtextlogo-white.png'
import { usePathname } from "next/navigation"
import { Pages } from "@/config/config"
import { CalendarWipe } from "../CalendarWipe"
import { BalancaModal } from "../BalanceModal"
import { useEffect } from "react"
import { $userStores, authUserEvent, getAuthStatusEvent, logoutEvent } from "@/store/auth"
import { useUnit } from 'effector-react'

import './navbar.css'
import { IconMoon, IconSun } from "@tabler/icons-react"

const checkIsInfoPage = (pathname: string) => {
  switch (pathname) {
    case Pages.contacts: return true;
    case Pages.delivery: return true;
    case Pages.policy: return true;
    case Pages.useraccess: return true;
    default: return false;
  }
}

export const NavBar = () => {
  let pathname = usePathname();
  const regexp = new RegExp(/\/news\/\w+/gm)
  pathname = pathname.replace(regexp, '/news')

  const { value: { isAuth, isLoading, user }, trigger, authUser, handleLogoutTrigger } = useUnit({
    value: $userStores,
    trigger: getAuthStatusEvent,
    authUser: authUserEvent,
    handleLogoutTrigger: logoutEvent
  });
  const matches = useMediaQuery('(max-width: 1600px)');
  const isInfoPage = checkIsInfoPage(pathname);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const [opened, { open, close }] = useDisclosure(false);
  const [isOpenBalanceModal, { open: handeOpenBalanceModal, close: handeCloseBalanceModal }] = useDisclosure(false);

  const handleLogin = () => {
    const popupWindow = window.open(
      `${process.env.NEXT_PUBLIC_API_CONFIG}user/auth`,
      "_self",
    );
    if (popupWindow?.focus) popupWindow.focus();
  };

  const handleLogout = async () => {
    handleLogoutTrigger()
  }

  useEffect(() => {
    if (!isAuth) {
      trigger()
    }
  }, [isAuth]);

  if(isLoading) {
    return <div className="loader__container"><Loader /></div>
  }

  return (
    <Flex gap={theme?.spacing?.md} className='nav-bar' justify='space-between'>
      <Flex align="center">
        <Link href='/'>
          <Image
            radius="md"
            w={matches ? 220 : 300}
            h={40}
            component={NextImage}
            src={bwtextlogo}
            alt="My image"
          />
        </Link>
      </Flex>
      <Flex gap={theme?.spacing?.md} className='flex' justify='flex-end' w={'100%'}>
        {!matches && <Link href="/" className={'buttonMain'}>
          <Button className='buttonMain' variant="outline" color={pathname === '/' ? "cyan" : "white"} size="lg">
            Главная
          </Button>
        </Link>}
        <Link href="/shop" className='buttonMain'>
          <Button className='buttonMain' variant="outline" color={pathname === '/shop' ? "cyan" : "white"} size="lg">
            Магазин
          </Button>
        </Link>
        <Link href="/news" className='buttonMain'>
          <Button className={'buttonMain'} variant="outline" color={pathname === '/news' ? "cyan" : "white"} size="lg">
            Новости
          </Button>
        </Link>
        <CalendarWipe isOpen={opened} onClose={close} />
        <Menu trigger="hover" openDelay={100} closeDelay={400} shadow="md" width={296} >
          <Menu.Target>
            <Button className={'buttonMain'} variant="outline" color={isInfoPage ? "cyan" : "white"} size="lg">
              Информация
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Link href={Pages.contacts} style={{textDecoration: 'none'}}>
              <Menu.Item style={{marginTop: '4px'}}>
                Контакты
              </Menu.Item>
            </Link>
            <Link href={Pages.delivery} style={{textDecoration: 'none'}}>
              <Menu.Item style={{marginTop: '4px'}}>
                Условия доставки
              </Menu.Item>
            </Link>
            <Link href={Pages.policy} style={{textDecoration: 'none'}}>
              <Menu.Item style={{marginTop: '4px'}}>
                Политика конфиденциальности
              </Menu.Item>
            </Link>
            <Link href={Pages.useraccess} style={{textDecoration: 'none'}}>
              <Menu.Item style={{marginTop: '4px'}}>
                Пользовательское соглашение
              </Menu.Item>
            </Link>
          </Menu.Dropdown>
        </Menu>
        {!isAuth && <Button className={'buttonMain'} variant="outline" color="green" size="lg" onClick={() => {
          handleLogin()
        }}>Войти</Button>}
        {isAuth && <Menu trigger="hover">
          <Menu.Target>
            <Link href={Pages.profile}>
              <UserAvatar user={user} />
            </Link>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>
              <Link href={Pages.profile} style={{textDecoration: "none"}}>
                Личный кабинет
              </Link>
            </Menu.Item>
            <Menu.Item onClick={handeOpenBalanceModal}>
              Пополнить баланс
            </Menu.Item>
            {(isAuth && user.role === 2) && (
              <Menu.Item>
                <Link href={Pages.admin} style={{textDecoration: "none"}}>
                  Панель администратора
                </Link>
              </Menu.Item>)
            }
            <Menu.Item onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}>
              Изменить тему
              </Menu.Item>
            <Menu.Item color="red" onClick={handleLogout}>
              Выйти
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>}
        {!isAuth && <ActionIcon
          onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
          variant="default"
          h={50}
          w={40}
          aria-label="Toggle color scheme"
        >
          {computedColorScheme === 'light' && <IconSun className={"icon light"} stroke={2} /> }
          {computedColorScheme === 'dark' && <IconMoon className={"icon dark"} stroke={2} /> }
        </ActionIcon>}
        <BalancaModal isOpen={isOpenBalanceModal} onClose={handeCloseBalanceModal} />
      </Flex>
    </Flex>
  )
}