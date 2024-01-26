'use client'
import { Flex, Button, Menu, Image, Loader, MenuItem } from "@mantine/core"
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
import { $userStores, authUserEvent, getAuthStatusEvent } from "@/store/auth"
import { useUnit } from 'effector-react'

import './navbar.css'

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
  const pathname = usePathname();
  const { value: { isAuth, isLoading, user }, trigger, authUser } = useUnit({
    value: $userStores,
    trigger: getAuthStatusEvent,
    authUser: authUserEvent
  });


  const matches = useMediaQuery('(max-width: 1600px)');
  const isInfoPage = checkIsInfoPage(pathname);
  const [opened, { open, close }] = useDisclosure(false);
  const [isOpenBalanceModal, { open: handeOpenBalanceModal, close: handeCloseBalanceModal }] = useDisclosure(false);

  const handleLogin = () => {
    const popupWindow = window.open(
      "https://turringrust.ru/api/v1/user/auth",
      "width=800, height=600",
    );
    if (popupWindow?.focus) popupWindow.focus();
  };

  useEffect(() => {
    window.addEventListener("message", (event) => {
      console.log(event, '123');
      if (event.origin !== "http://localhost:3000") return;

      const { ok } = event.data;
      console.log(ok)
    });
  }, []);


  useEffect(() => {
    if (!isAuth) {
      trigger()
    }
  }, [isAuth]);

  if (isLoading) {
    return <div className="loader__container"><Loader color="blue" size="xl" /></div>
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
          <Button className={'buttonMain'} variant="outline" color="white" size="lg">
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
            <Link href={Pages.contacts}>
              <Menu.Item>
                Контакты
              </Menu.Item>
            </Link>
            <Link href={Pages.delivery}>
              <Menu.Item>
                Условия доставки
              </Menu.Item>
            </Link>
            <Link href={Pages.policy}>
              <Menu.Item>
                Политика конфиденциальности
              </Menu.Item>
            </Link>
            <Link href={Pages.useraccess}>
              <Menu.Item>
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
            <Link href='/profile'>
              <UserAvatar user={user} />
            </Link>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={handeOpenBalanceModal}>
              Пополнить баланс
            </Menu.Item>
            {isAuth && (
              <Menu.Item>
                <Link href={Pages.admin}>
                  Панель администратора
                </Link>
              </Menu.Item>)
            }
            <Menu.Item color="red">
              Выйти
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>}
        <BalancaModal isOpen={isOpenBalanceModal} onClose={handeCloseBalanceModal} />
      </Flex>
    </Flex>
  )
}