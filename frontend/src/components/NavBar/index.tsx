'use client'
import { Flex, Button, Menu, Image } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import Link from "next/link"
import { UserAvatar } from "../UserAvatar"
import { theme } from "../theme/theme"
import styles from './navbar.module.css'
import NextImage from 'next/image';
import bwtextlogo from '../../../public/bwtextlogo.png'
import { usePathname } from "next/navigation"

export const NavBar = () => {
    const pathname = usePathname();
    const isAuth = true;
    const matches = useMediaQuery('(max-width: 1600px)');

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
            <Button className={styles.buttonMain} variant="outline" color={pathname === '/' ? "cyan"  : "white" } size="lg" fullWidth>
              Главная
            </Button>
          </Link>}
          <Link href="/shop" className={styles.buttonMain}>
            <Button className={styles.buttonMain} variant="outline" color={pathname === '/shop' ? "cyan"  : "white" } size="lg" fullWidth>
              Магазин
            </Button>
          </Link>
          <Link href="/news" className={styles.buttonMain}>
            <Button className={styles.buttonMain} variant="outline" color="white" size="lg" fullWidth>
              Новости
            </Button>
          </Link>
          <Button className={styles.buttonMain} variant="outline" color="white" size="lg" fullWidth>Календарь вайпов</Button>
          <Menu trigger="hover"  openDelay={100} closeDelay={400} shadow="md" width={296}>
            <Menu.Target>
              <Button className={styles.buttonMain} variant="outline" color="white" size="lg" fullWidth>
                Информация
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>
                Контакты
              </Menu.Item>
              <Menu.Item>
                Поддержка
              </Menu.Item>
              <Menu.Item>
                Условия доставки
              </Menu.Item>
              <Menu.Item>
                Политика конфиденциальности
              </Menu.Item>
              <Menu.Item>
                Пользовательское соглашение
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          {!isAuth && <Button className={styles.buttonMain} variant="outline" color="green" size="lg" fullWidth>Войти</Button>}
          <Link href='/profile'>
            <UserAvatar />
          </Link>

        </Flex>
      </Flex>
    )
}