'use client'
import { Flex, Button, Menu, Image } from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import Link from "next/link"
import { UserAvatar } from "../UserAvatar"
import { theme } from "../theme/theme"
import styles from './navbar.module.css'
import NextImage from 'next/image';
import bwtextlogo from '../../../public/bwtextlogo.png'
import { usePathname } from "next/navigation"
import { Pages } from "@/config/config"
import { CalendarWipe } from "../CalendarWipe"
import { BalancaModal } from "../BalanceModal"
import { useEffect } from "react"
import { authUserEvent, getAuthStatusEvent } from "@/store/auth"

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
  const isAuth = false;
  const isAdmin = false;
  const matches = useMediaQuery('(max-width: 1600px)');
  const isInfoPage = checkIsInfoPage(pathname);
  const [opened, { open, close }] = useDisclosure(false);
  const [isOpenBalanceModal, { open: handeOpenBalanceModal, close: handeCloseBalanceModal }] = useDisclosure(false);
  useEffect(() => {
    getAuthStatusEvent()
  },[]);
  return (
    <Flex gap={theme?.spacing?.md} className={styles.flex} justify='space-between'>
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
      <Flex gap={theme?.spacing?.md} className={styles.flex} justify='flex-end'>
        {!matches && <Link href="/" className={styles.buttonMain}>
          <Button className={styles.buttonMain} variant="outline" color={pathname === '/' ? "cyan" : "white"} size="lg" fullWidth>
            Главная
          </Button>
        </Link>}
        <Link href="/shop" className={styles.buttonMain}>
          <Button className={styles.buttonMain} variant="outline" color={pathname === '/shop' ? "cyan" : "white"} size="lg" fullWidth>
            Магазин
          </Button>
        </Link>
        <Link href="/news" className={styles.buttonMain}>
          <Button className={styles.buttonMain} variant="outline" color="white" size="lg" fullWidth>
            Новости
          </Button>
        </Link>
        <CalendarWipe isOpen={opened} onClose={close} />
        <Button className={styles.buttonMain} variant="outline" color="white" size="lg" fullWidth onClick={open}>Календарь вайпов</Button>
        <Menu trigger="hover" openDelay={100} closeDelay={400} shadow="md" width={296}>
          <Menu.Target>
            <Button className={styles.buttonMain} variant="outline" color={isInfoPage ? "cyan" : "white"} size="lg" fullWidth>
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
        {!isAuth && <Button className={styles.buttonMain} variant="outline" color="green" size="lg" fullWidth onClick={() => {
          authUserEvent()
        }}>Войти</Button>}
        {isAuth && <Menu trigger="hover">
          <Menu.Target>
            <Link href='/profile'>
              <UserAvatar />
            </Link>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={handeOpenBalanceModal}>
              Пополнить баланс
            </Menu.Item>
            {(isAuth && isAdmin) && (
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