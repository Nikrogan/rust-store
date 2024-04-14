'use client'
import { Flex, Menu, Image, Loader, ActionIcon, useMantineColorScheme, useComputedColorScheme, Box, Notification, rem } from "@mantine/core"
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
import { useEffect, useState } from "react"
import { $userStores, authUserEvent, getAuthStatusEvent, logoutEvent } from "@/store/auth"
import { useUnit } from 'effector-react'

import './navbar.css'
import { IconMoon, IconSun, IconX } from "@tabler/icons-react"
import { ButtonWrapper } from "@/shared/ButtonWrapper/ButtonWrapper"
import { $notification, deleteNotificationEvent } from "@/store/notification"
import { isNotEmptyArray } from "@/shared/array"
import styled from "styled-components"
import { Button } from "../Button"
import { Select } from "../Select"
import { SteamIcon } from "../SteamIcon"

const checkIsInfoPage = (pathname: string) => {
  switch (pathname) {
    case Pages.contacts: return true;
    case Pages.delivery: return true;
    case Pages.policy: return true;
    case Pages.useraccess: return true;
    default: return false;
  }
}

const StyledLink = styled(Link)`
  transition: all 0.4s;

  &:hover {
    transform: scale(1.05);
  }
`

const FlexContainer = styled.div`
  display: flex;
  gap: ${({gap}) => `${gap}px`};
  height: ${({height}) => height ? `${height}px` : 'auto' };
  background: ${({bg}) => bg ? bg : ''};
  align-items: ${({align}) => align ? align : 'auto'};
  padding: ${({p}) => p ? `${p}` : '0px'};
  justify-content: ${({justify}) => justify ? justify : 'auto'};
`


const MenuLinks = [
  {
    title: 'Главная',
    href: '/'
  },
  {
    title: 'Магазин',
    href: '/shop'
  },
  {
    title: 'Новости',
    href: '/news'
  },
  {
    title: 'Информация',
    href: null,
    itemList: [
      {
        title: "Команды",
        href: '/comands'
      },
      {
        title: "Политика конфиденциальности",
        href: '/policy'
      },
      {
        title: "Пользовательское соглашение",
        href: '/useraccess'
      },
      {
        title: "Команды",
        href: '/delivery'
      },
      {
        title: "Контакты",
        href: '/contacts'
      },

    ]
  },
  {
    title: 'Баны',
    href: '/bans'
  },
]


//TODO - Заменить Loader на свой
export const NavBar = () => {
  let pathname = usePathname();
  const regexp = new RegExp(/\/news\/\w+/gm)
  pathname = pathname.replace(regexp, '/news')

  const { value: { isAuth, isLoading, user }, notificationList, deleteNotification, trigger, authUser, handleLogoutTrigger } = useUnit({
    value: $userStores,
    trigger: getAuthStatusEvent,
    authUser: authUserEvent,
    handleLogoutTrigger: logoutEvent,
    notificationList: $notification,
    deleteNotification: deleteNotificationEvent
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
    localStorage.setItem('lastPage', pathname)
    if (popupWindow?.focus) popupWindow.focus();
  };

  const handleLogout = async () => {
    handleLogoutTrigger()
  }

  useEffect(() => {
    if (!isAuth) {
      trigger()
    }
  }, [isAuth, trigger]);

  const viewLinks = MenuLinks.map((item, index) => {
    if(item.href === null) {
      return <Select key={item.title + index} options={item.itemList}>
        {item.title}
      </Select>
    }
    return <StyledLink key={item.title} href={item.href}>{item.title}</StyledLink>
  })
  return (
    <FlexContainer bg={'#1a1a1a'} p={"0 24px"} height={64} gap={16} align="center" justify="space-between">
      <FlexContainer gap={16}>
        {viewLinks}
      </FlexContainer>
      <FlexContainer>
       {isAuth && (
       <>
       <StyledLinkPromo>Активировать промокод</StyledLinkPromo>
        <StyledMoneyLink>
          <MoneyImage />
          <StyledMoneyCount>
            {user?.balance} BW
          </StyledMoneyCount>
        </StyledMoneyLink>
        <StyledProfileLink href={'/profile'}>
          <UserImage />
          {user?.displayName}
        </StyledProfileLink>
      </>
      )}
        {isLoading ? <Loader /> : <Button onClick={isAuth ? handleLogout : handleLogin} RightElement={isAuth ? null : SteamIcon}>{isAuth ? "Выйти" : "Войти"}</Button>}
      </FlexContainer>
    </FlexContainer>
  )
}

const StyledLinkPromo = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  cursor: pointer;
  margin-right: 8px;

  transition: all 0.4s;

  &:hover {
    transform: scale(1.05);
  }
`

const StyledMoneyLink = styled.div`
  display: flex;
  background: #0B0911;
  padding: 10px;
  align-items: center;
  cursor: pointer;
`

const StyledMoneyCount = styled.div`
  margin-left:8px;
`

const StyledProfileLink = styled(Link)`
  background: #0B0911;
  padding: 10px;
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-right: 12px;
  cursor: pointer;

  & svg {
    height: 20px;
  }
`

export const UserImage = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <mask id="mask0_588_393" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
      <rect width="20" height="20" fill="url(#pattern0)"/>
      </mask>
      <g mask="url(#mask0_588_393)">
      <rect width="20" height="20" fill="url(#pattern1)"/>
      <rect width="20" height="20" fill="#7950F2"/>
      </g>
      <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
      <use xlinkHref="#image0_588_393" transform="scale(0.00195312)"/>
      </pattern>
      <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
      <use xlinkHref="#image0_588_393" transform="scale(0.00195312)"/>
      </pattern>
      <image id="image0_588_393" width="512" height="512" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAIABJREFUeJzt3XmQXtV55/Fva19YJCQsISQksQixSCwCs0g2m2wwixds8BgcMFMDXqYcKvZMGI8rZWeSqjjLJJWaSsYMjuPYxHEgTrCxAzb7IsIOQoARGMSOQAKxamktPX+cV6gl9fJ29/ve5957vp+qp9SmcNUP9XvPed5zzz23A0lVNhaY3agpwGRgT2DSDjWq8e9PbPw5Chjf+Pk9oLPx85rGnxuA13eo1Y1aCTwLrADWtf4/SVIROqIDSOrXSOBAYD5wKLAvMKtRU8JSJa+SGoFnG38ua9RyYGNcLEn9sQGQymUscBRwDGnCnwcczLZv8FXRCTxOagYeAe4B7scVA6k0bACkWFOADwILgIXAImBMaKL22QQsBZYADwC3As9HBpJyZgMgFWsEcCxwJrAYOJK8r8NngBuBXwC/Ju09kFSAnAceqSjTgbOAjwEns23znbb3LnATcD1wLfBSbBxJkgZuMnABcAOwGeiyBlSbgTuBS4FpA/y7lySpUJOB/wrchpN+q5uBW4Avkx5plCSpFBYAlwNriZ8s617rgatI+ye8hSlJKtxU4DLgKeInxVzrKeDbwIy+f1WSJA3dEcCVpOfcoydAK1Un8CPg8D5+b5IkDcoi0s70LcRPeFbvdSfpiQtvD0iSBm0EcBHwGPETmzWwWgZc2PgdSpLUlGHAOaTz7KMnMmtotQK4BBiOJEm96CAtHz9M/MRltbYeJ53LMAxJkro5jXROffREZbW3HgI+iiQpeweQniuPnpisYusG0lsWJUmZmQB8h3SwTPRkZMVUJ/DXwO5IkmqvA7gYWEX8BGSVo14lPe3ho4OSVFP7kV49Gz3hWOWs24EDkSTVxgjSW+XeJX6Sscpda0nHC49CklRpC/CxPmvg9SBwJJKkyhlG+ta/gfjJxKpmbSStBniIkCRVxD7AbcRPIFY96i5gXyRJpXYO8Abxk4ZVr3oL+DySpNIZT3pNb/REYdW7fgCMQ5JUCvsDjxA/OVh51FLSI6WSpECn45K/VXy9BXwSqcLc3aqq6gAuA/4Ol2RVvNHAZ4GxwM2kpkCS1GbjgZ8T/y3QsrqAa0ifSalSPPtaVbMXcC3pgB+pLJYCZwIvRgeRmmUDoCo5BPglMDM6iNSDl4AzSM2AVHrDogNITToFWIKTv8prb+AO4LToIFIzbABUBecB1+F721V+uwI/I20QlErNpwBUdhcD3ye90U+qguHAp0i3BB4KziL1ygZAZfYV4G9xpUrVMww4i3RewN3BWaQe2QCorC4D/go3qqq6Oti2H+C2yCBST2wAVEZ/BPyv6BBSi5xIWhG4NTaGtD0bAJXNN0nvYJfq5ASgE7gzOoi0lQ2AyuSrwJ9Hh5Da5BTgXeA/ooNIYAOg8vgC8F285696+wjwMvBgdBDJBkBlcB7pPevu9lfddZDeYLkceCw4izLnty1FOxH4FTAqOIdUpI2kRuDG6CDKlw2AIh1MOt53QnQQKcDbwCJgWXQQ5ckGQFH2Im2G8mx/5exZ4Fjg1eAcypD3XBVhHPBvOPlLs0hvuBwfnEMZsgFQ0YYBPwGOiQ4ilcQC4Eocj1UwnwJQ0f6Q9IIfSdvMBTYDt0cHUT7cA6AinUl6VarfdKSdbSG9QOjfo4MoDzYAKsoBwL2441/qyxrgaODp6CCqP7+JqQjjgX/FyV/qz0TStTIuOojqzz0AKsLfA4ujQ0gVMQWYRrpdJrWNDYDa7fPAt6JDSBVzBOm44Eejg6i+3AOgdpoBLCUta0oamDeBw4HnooOontwDoHYZBvwQJ39psCYAP8KVWrWJHyy1yzeB/xwdQqq4mcA64M7oIKofbwGoHRaQzvkfGR1EqoGNpJMzH4oOonqxAVCrjQDuAY6MDiLVyFLS+QAbo4OoPrwFoFb7H6Sd/5JaZyrwDnBXdBDVhysAaqU5wMPA2OggUg2tA+YDv40OonrwKQC1Sgfwf3Hyl9plLHAFfnFTi3gLQK1yMfC70SGkmptFOhfg4eAcqgE7SbXCBOApYHJ0ECkDr5Fut70VHUTV5gqAWuFPgJOjQ0iZGE8au2+IDqJqcwVAQzUXeASf+ZeK1AnMA56MDqLqchOghuovcfKXijYK+PPoEKo2VwA0FItxGVKKdBrwq+gQqiYbAA1WB+lo0sOig0gZexA4CuiKDqLq8RaABuscnPylaEcCn4wOoWpyBUCDMRxYBhwUHUQSj5FOCNwSHUTV4gqABuM8nPylsjiEtCInDYgrABqo4aRvHAdGB5H0vidJjcCm6CCqDlcANFAX4OQvlc0c4D9Fh1C1uAKggegAHgUOjg4iaSfLSBtzfSJATXEFQANxOk7+UlnNAz4SHULVYQOggfh6dABJffIaVdO8BaBmHUY6+MfPjFRuR+DrgtUEVwDUrN/HyV+qgt+LDqBqcEBXM6YCz+NLf6Qq6ARmAK9FB1G5uQKgZlyEk79UFaOAC6NDqPxcAVB/OkiHjOwfHURS054E5uIjgeqDKwDqz8k4+UtVMwf4UHQIlZsNgPpzcXQASYPitas+eQtAfZkEvASMjg4iacDWA9OANdFBVE6uAKgvn8PJX6qqMfiWQPXBBkB9cfCQqu3c6AAqL28BqDd7AS+QXv8rqZo2A3sDr0YHUfm4AqDenIuTv1R1w4FPR4dQOdkAqDcuHUr14LWsHnkLQD2ZDjyHDaJUB1tIRwO/HB1E5eIAr558HD8bUl0MA86MDqHycZBXT06LDiCppbymtRNvAWhHo4DXgV2ig0hqmXeAyaQ3BUqAKwDa2Ydx8pfqZlfg+OgQKhcbAO3oY9EBJLWF17a2YwOgHXmvUKonGwBtxz0A6m4KsDI6hKS26AKmAq9FB1E5uAKg7hZFB5DUNh3AcdEhVB42AOpuYXQASW3lNa732QCoOwcHqd68xvU+9wBoq7HAm6RzACTV0wZgArA+OojiuQKgrY7GyV+qu9HAgugQKgcbAG31wegAkgpxTHQAlYMNgLY6LDqApELMjw6gcrAB0FYOClIe5kUHUDm4CVAAI4F3cQ+AlIMNpPd9bIoOoliuAAhgLk7+Ui5GA3OiQyieDYDA5X8pN94GkA2AADgkOoCkQh0aHUDxbAAEsG90AEmF8pqXDYAAmB0dQFKhZkUHUDwbAIGDgZQbm375GKAYD7yDnwUpJ13AOHwnQNZcAdAsnPyl3HQAM6NDKJYNgBwEpDx5GyBzNgCaFh1AUoi9ogMolg2AJkcHkBTCaz9zNgCaFB1AUgiv/czZAMhBQMqT137mbADkICDlyWs/czYA8j6glCev/czZAGhCdABJISZGB1AsGwCNiQ4gKcTo6ACKZQOgUdEBJIWwAcicDYBsAKQ8ee1nzgZAfguQ8uS1nzkbAPktQMqTDUDmbABkAyDlyQYgczYAkiRlyAZAndEBJIXYEB1AsWwAZAMg5ckGIHM2AHIQkPLktZ85GwC5AiDlyWs/czYAchCQ8uQKQOZsALQ+OoCkEDYAmbMB0JroAJJCvBEdQLFsALQ6OoCkEF77mbMB0OvRASSF8NrPnA2A/BYg5clrP3M2APJbgJQnr/3M2QDIQUDKk9d+5mwA9Ep0AEkhVkYHUCwbAD0bHUBSiBXRARSrIzqAwo0F3sPPgpSTLmAcHgSWNVcAtA5YFR1CUqFewck/ezYAApcCpdw8Gx1A8WwABA4GUm5s+mUDIACejg4gqVDPRAdQPBsAATwaHUBSoZZFB1A8GwCBg4GUG695+eiXABgBvAuMjg4iqe3WA7sAm6ODKJYrAALYBPwmOoSkQjyGk7+wAdA2j0QHkFQIr3UBNgDaxnuCUh7c9CvABkDb3BMdQFIh7o4OoHJwE6C2Gg28hRsBpTrbAEzAY4CFKwDaZgPwUHQISW11H07+arABUHdLogNIaiuvcb3PBkDdOThI9eY1rve5B0DdfQB4NTqEpLboAqbg67/V4AqAunuNdEiIpPp5BCd/dWMDoB1dFx1AUlt4bWs7NgDa0fXRASS1hde2tuMeAO1oFLAa2DU6iKSWeRuYDGyMDqLycAVAO+oEbokOIamlbsTJXzuwAVBPXCqU6sVrWjvxFoB6sjfwPDaIUh1sAaYDr0QHUbk4wKsnLwF3RYeQ1BK34eSvHtgAqDdXRQeQ1BJey+qRtwDUm6nAi8Dw6CCSBm0zMI10yJe0HVcA1JuVwB3RISQNyc04+asXNgDqi0uHUrX9c3QAlZe3ANSXSaTbAGOig0gasHWkJ3rWRAdRObkCoL68DlwTHULSoFyNk7/6YAOg/lwRHUDSoHwvOoDKzVsA6k8HsBw4IDqIpKY9CcwFuqKDqLxcAVB/uoDvR4eQNCBX4OSvfrgCoGZMAV4ARkYHkdSvTmAGPv6nfrgCoGa8io8TSVXxY5z81QRXANSs+cDD+JmRyu5wYGl0CJWfKwBq1iPATdEhJPXpepz81SQbAA3E/44OIKlPfxEdQNXhcq4G6mHgsOgQknbyCGn5393/aoorABqov4oOIKlHf4qTvwbAFQAN1HDgMeDA6CCS3vckcDDp9b9SU3zXuwaqi3S++NnRQSS978vAo9EhVC2uAGgwhgEPkR4NlBTrUdK+nC3RQVQtrgBoMLqA1cC50UEkcQnwRHQIVY8rABqsDuBB0q5jSTEeAI7GzX8aBJ8C0GB1Af8tOoSUuW/g5K9BsgHQUNwEXBsdQsrUvwI3RIdQdXkLQEO1H+mxwNHRQaSMdAKHAk9FB1F1uQlQQ7UG2B04PjqIlJE/A66ODqFqcwVArbAr6SCSqdFBpAy8CswB3o4OompzBUCt0Am8AXwiOoiUga8A90WHUPW5AqBW6QB+DSyODiLV2C3AKbjzXy1gA6BWmg0sA8ZHB5FqaC3p9M2no4OoHrwFoFZ6k/QyElcBpNb7BvDL6BCqD1cA1GojgLuBBdFBpBp5mHTi36boIKoPDwJSq20inU2+MTqIVBOdwBdw8leLeQtA7fAK6VbAKdFBpBr4n6RT/6SW8haA2mUYcCNwUnQQqcJuB04mNdRSS9kAqJ2mA0uBPaKDSBX0JnAY8Hx0ENWTewDUTi8CX4wOIVXUl3DyVxu5B0Dt9jjpfIDDo4NIFXIF8J3oEKo3bwGoCGOAJcCR0UGkCniY9HKtddFBVG82ACrKTOABYFJ0EKnE3gCOAlZEB1H9uQdARXkO+BzuZpZ6swU4Hyd/FcQ9ACrSM6RVpxODc0hl9E3gB9EhlA9vAahow0iHmvjqYGmbnwLn4Fv+VCAbAEUYC9wMHBsdRCqB+0mrYu8F51BmbAAUZU/gP4D9ooNIgVYAxwGvRgdRftwEqCirgLOANdFBpCBvAKfj5K8gNgCK9BvgU8CG6CBSwTYC5wJPRAdRvnwKQNGeA54iNQI2pMrBZtIjsb+MDqK82QCoDB4jNQIfx30pqrcu0vsxrowOItkAqCyWAq+T7olKdfV14G+jQ0hgA6ByuQ94Gzg1OojUBt8A/iI6hLSVDYDK5m7SXoATooNILfSHwB9Hh5C6swFQGd0KrAcWB+eQWuFbpAZAKhUbAJXVEtLz0afjxkBVUxfwe8CfRQeRpCo6n/TMdJdlVag2ARchlZgrACq7ZcCTpEcE/byqCjYA5wE/jg4i9cWlVVXFQuAaYHJ0EKkPa4CzSftYpFKzAVCV7A/8O3BAdBCpBytIe1Y83leV4NGrqpLfAseTNghKZXIv6a1+Tv6qDBsAVc1q4KPAv0UHkRp+CpyIb/VTxbipSlW0EbgKWAechI2sYnSRHvH7EukzKUkq0Emkb17Rj31ZedVqPLJaksLNIN2DjZ4UrDzqQWA2kqRSGAt8n/jJwap3/T9gDJKk0vk06bXC0ROFVa96E/gckqRSmwHcQvykYdWjbgamI0mqhA7gUtKxrNETiFXN2gh8G58ykaRKOgJ4gPjJxKpW3QcchiSp0kaQVgPeIX5iscpda4HL8IwUSaqVfYFfEz/JWOWsW4E5SJJqqYP0nvaVxE84VjnqFeACJElZGE/a4LWO+AnIiqlO4K+B3ZAkZWd/0nsFoicjq9i6FtgPSVL2FuPTAjnUfcDJSJK0g8Wks96jJyqrtfUocA5pD4gkST3qAM4ClhI/cVlDq8dJG/x8rE+S1LThwOexEahiPQSch6f4SZKGaBFp49gW4ic3q/e6k7R641K/JKml5gP/gO8YKFNtAH4AzOv91yZJUmtMBC4BlhE/AeZay0nH9n6gn9+VJEltsQC4HHiX+Emx7rWedG7DYlzmlySVxNZVgRuBTcRPlnWpTcANwH8BJjT925AkKcAk0uNn15LeKx89iVatNpM29F0KTB3g372kJriEJrXfNOBM4DTS0vWusXFK623S6sn1wC9IL+mR1CY2AFKxRpIeKTytUfNj44RbSprwrweWkFZLJBXABkCKtRvwQVJTsLDx55jQRO2ziTThLyEt798KrIoMJOXMBkAqlzHAUaSmYD7p2fZDgNGRoQZhPekY3kdIj0reA9xPemZfUgnYAEjlNwI4gNQQHArsC8wCZgN7xcUC0n36FY16hvTSnWXAU6Rv/JJKygZAqrYxbGsGppKePpjcqEmNmgiMa/z7u5HecTAS2KXxz94l3XvfTNqIB7AWWAO83qhVjT9XAyuBZxu1vj3/WZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSbnpiA4gqeXGAGOBiY3/PRoY1/h5N2A4MALYtfHP3gE2AZuBtxv/bC2wofHzGmAdsL6tqSUVygZAqoYpwCxgBvABYDIwqVvt2fhnk4HxbcrwLvA6sApY3fj59W4/vwa8AKxo/CypxGwApHLYDdiPNMnPblT3n8f19n8sqbWkRqB7Pdv482nSqoOkQDYAUvGmAQsadTBwCDAXGBYZqmCvAA8AjwGPN35+gnQbQlIBbACk9hkBHAkcA8wHDiNN9lX7Nl+UtaSGYGmj7gEeIu1PkNRiNgBS6+xKmuwXkb7dfwjYPTRR9a0lNQF3Aksa9UZoIqkmbACkwdsbOBk4HlhI+naf0zJ+hC2kVYI7gbuAm0i3EyQNkA2A1LzhwOHAWcCZpOV9r6F4zwC/AK4Fbgc6Y+NI1eDgJfVtCnAqacL/CDAhNo768R5wC6kZuI70WKKkHtgASDubB5wLfKLxs6prKfBz4J9Jtw4kNdgASMls0qR/AenRPNXP48DVwE9IjxxKWbMBUM5mAp8EziFt4lM+tjYDPwaeDM4iSSrAHsClpINnuiwLuA/4KtvenSBJqpEFwOWkTWLRE45VzloPXAUsxtVRSaq0icAlwDLiJxerWrUcuIz04iVJUgV0kB7Xu4r0OtvoicSqdm0gPUFwCq4KSFIpjSLt4PfbvtWuWk7aPzIGSVK43UiD8gvETxBWHrUS+DZpQ6kkqWCzge8AbxI/IVh51jukjaVzkCS13QLS89ubiJ8ALKsL2Eg6XOhwJEktdwhpY98W4gd8y+qptpDeQXAEkqQhmwv8EL/xW9WpzaRm9UAkSQM2k3R/dSPxA7plDaa2NgL7I0nq1z7AFaR3ukcP4JbViuoEvgtMR5K0k3GkR6vWEj9gW1Y7ai3pyZVdkSTRQXob33PED9CWVUS9RDqiehiSlKmjgSXED8iWFVH3AscjSRnZm7TBbzPxg7BlRdYW0kbBfZAKNjw6gLIyCvgG6eUqx+HLVaQO0hkXF5MagntITYHUdg7AKsqRwPfwkBSpL8tIzcA90UFUf25CUbuNI+18vhcnf6k/84C7SLfIdgnOIkmDdhrwLPH3WS2rirUCOBWpTVwBUDtMJH2DuY50op+kgZsFXE/aJLhnbBRJ6t9ngVXEf3uyrDrVq8BnkFrIFQC1yq6kb/0/ASYHZ5Hq5gOk12BfBUwIzqKa8CkAtcIxwJX40hOpCM8CvwPcGZxDFec5ABqKEcB/B36E9yilokwALgDGA7fhuQEaJFcANFgzSd/6F0UHkTJ2D3A+8HR0EFWPewA0GBeSDixx8pdiHQM8AJwXHUTV4wqABmI08H9IJ5VJKpcfAV8E1kUHUTXYAKhZ04F/IX3jkFRODwCfJr1eW+qTtwDUjBOA+3Hyl8puAelaXRwdROXnUwDqSwdwKWmz327BWSQ1ZxxpY+AG0nsFpB55C0C92QX4PnBOdBBJg/Yz0qbdt6KDqHxsANSTA0gDx0HRQSQN2WPAJ/BRQe3APQDa0XHAEpz8pbo4hHRewIeig6hcbADU3WeAm/BUP6luJgE3AJ+LDqLycBOgtroU+B4wKjqIpLYYAZxNuvV7a2wUlYENgIYDfwP8Ae4JkequAziRdK7H9fgegaw54OdtF9Lre8+IDiKpcL8mPeXzdnQQxbAByNc04DpgfnQQSWEeAk4HVkYHUfFsAPI0E7gR2D86iKRwK0gnBz4THUTFsgHIzxzS5D8jOoik0nie1AQ8FR1ExfExwLwcBNyCk7+k7e0D3AHMiw6i4tgA5ONI4HbSvX9J2tEU4Dbgg9FBVAwbgDwsAm4GJkcHkVRqE0lPByyMDqL2swGov8Wk5313jw4iqRJ2B34FnBwdRO3lJsB6W0i6kMdHB5FUOetIjwjeGpxDbWIDUF/Hkpbydo0OIqmy3gNOA+6MDqLWswGop8NI9/z3iA4iqfLeIt0OeDA6iFrLBqB+DiTt5J0SHURSbawivUPg8eAcaiEbgHrZDx/1k9QeLwEfxhMDa8MGoD6mkyb/2dFBJNXW86Qm4LnoIBo6G4B6mEI6xeuA6CCSau8JUhOwKjqIhsZzAKpvLHANTv6SijEX+CUwLjqIhsYGoNqGAVeSHvmTpKIcDfwDziGVNjw6gIbkL4GLokNIytLBpBXIG6ODaHBsAKrri8AfR4eQlLWFwGrgvuggGjg3AVbTGcDPsIGTFG8zcDbw8+ggGhgbgOpZQDrox/P9JZXFu6QnAx6KDqLm2QBUywzgXmBqdBBJ2sFLwDGNP1UB7uCsjtHAT3Hyl1ROewP/QhqrVAHeQ66O7wJnRYeQpD5MByaRzglQydkAVMMlwLeiQ0hSE44GXsD9AKXnHoDyOwJYQnreVpKqYD2wCHggOoh6ZwNQbpOA+4FZwTkkaaCeA44inROgEnITYHkNB36Mk7+kapoJ/ARvNZeWv5jy+lPggugQkjQE+5LmmZujg2hn3gIop48C1+PvR1L1bSGNaTdFB9H2nGDKZzLwCLBXdBBJapGXgMOA16ODaBv3AJTP3+HkL6le9gauiA6h7bkHoFy+DHwtOoQktcFBwIt4PkBpeAugPPYnXRi7RAeRpDZ5j/RCs+XRQeQtgLIYSXrkz8lfUp2NB/4RGBUdRN4CKIvvAOdEh5CkAkwjffn00cBg3gKI92HgFlyNkZSPzaSx767oIDmzAYg1mnTf/6DoIJJUsOXA4aT3BiiAtwBi/RHwqegQkhRgMmkl4NbgHNlyBSDOfNKLfkZGB5GkIJ3AkcBj0UFy5H3nGMNJB/44+UvK2SjSWOhqdAD/0mN8HfhCdAhJKoHppFcG3xsdJDfeAijeLGAZPvMvSVu9B8wDVkQHyYm3AIp3OU7+ktTdeOBvokPkxgagWOeRXospSdrex4DPRIfIibcAijMWeALYJzqIJJXUC8BcYG10kBy4CbA4fwB8PDqEJJXY7sA64I7oIDlwBaAY00nf/sdHB5GkkltLWgV4ITpI3bkCUIzLSYddSJL6NhKYBFwTHaTuXAFov+OAJfh3LUnN6iKNnfdEB6kzJ6X2GgbcDRwdHUSSKuZu4HhSM6A28DHA9roQJ39JGoxjgfOjQ9SZKwDtMxb4LTAtOogkVdQLwAHAhuggdeQKQPt8GSd/SRqKGcAl0SHqyhWA9hgPPA1MiQ4iSRW3EtgPDwdqOVcA2uN3cfKXpFaYSlpRVYu5AtB6u5HeaLVHdBBJqonVwL7AO9FB6sQVgNb7Gk7+ktRKk4GvRoeoG1cAWmsC6dv/hOggklQzb5JWAdZEB6kLVwBa6/dx8pekdpgAXBodok5cAWidScCzwC7BOSSprt4GZpJWAzRErgC0zldw8pekdtoN+FJ0iLpwBaA1RpO+/U8NziFJdfcyMBvojA5Sda4AtMYFOPlLUhGmAedFh6gDVwCGrgN4FDg4OogkZeJRYD6+KXBIXAEYujNw8pekIh0KnBodoupsAIbu69EBJClDjr1D5C2AoVkA3B8dQpIydSTwUHSIqnIFYGjsQCUpzteiA1SZKwCDNwV4ARgZHUSSMtUJzABeiw5SRa4ADN5FOPlLUqRRpMewNQiuAAxOB7AcOCA6iCRl7klgLj4SOGCuAAzOSTj5S1IZzAE+FB2iimwABufi6ACSpPc5Jg+CtwAGbhLwIjAmOogkCYD1wN7AG9FBqsQVgIG7ECd/SSqTMcD50SGqxhWAgXsMj/6VpLJZRno/gJrkCsDALMTJX5LKaB5wTHSIKrEBGBiXmCSpvHxN8AB4C6B5w4GXSCcASpLKZyUwHdgcHaQKXAFo3kk4+UtSmU0FFkWHqAobgOadGx1AktQvx+omeQugOSOAl4E9o4NIkvq0CpgGbIoOUnauADRnMU7+klQFewInRIeoAhuA5nw2OoAkqWmO2U3wFkD/RpJ2lu4RHUSS1JQ1pA2BndFByswVgP59BCd/SaqSicCJ0SHKzgagf2dGB5AkDdgZ0QHKzlsA/Xsa2Dc6hCRpQJ4C5kSHKDNXAPo2Fyd/SaqiA4D9o0OUmQ1A3z4WHUCSNGinRQcoMxuAvtkASFJ12QD0wT0AvRsPrAbGRAeRJA3KOmBS40/twBWA3p2Ek78kVdlY4EPRIcrKBqB3Lv9LUvU5lvfCBqB3p0YHkCQNmfsAeuEegJ7tDbwYHUKS1BJ7kY50VzemjT6TAAAEG0lEQVSuAPRsUXQASVLLHB8doIxsAHq2MDqAJKllHNN7YAPQMz8sklQfjuk9cA/AzsYDbwIjooNIklpiIzABWBsdpExcAdjZsTj5S1KdjASOjg5RNjYAO3OpSJLqx83dO7AB2JkNgCTVj2P7DtwDsL3hwOvA7tFBJEkt9RbpvQCbo4OUhSsA2zsQJ39JqqPdgf2iQ5SJDcD25kcHkCS1jWN8NzYA25sXHUCS1DaO8d3YAGzP7lCS6ssxvhsbgO354ZCk+nKM78anALaZALyBfyeSVFddpLH+7eggZeAKwDbzcfKXpDrrAA6NDlEWNgDbuDQkSfXnWN9gA7CNu0Mlqf4c6xtsALY5JDqAJKntvAXQYAOwjSdESVL97RsdoCzc9JaMBd7Dvw9JqrstwDhgQ3SQaK4AJLNw8pekHAwD9okOUQY2AMms6ACSpMLMig5QBjYAyezoAJKkwjjmYwOwlR8GScqHYz42AFv5YZCkfDjmYwOw1azoAJKkwsyKDlAGNgCJ3aAk5cMxHx99AxgDrIsOIUkqTBdp7O+MDhLJFQDYMzqAJKlQHcCk6BDRbAD8EEhSjrIf+20AYHJ0AElS4bIf+20A/BBIUo6yH/ttAFwGkqQcZT/22wDYBUpSjrIf+20A7AIlKUfZj/02AHaBkpSj7Md+GwDYIzqAJKlwrgBEByiB8dEBJEmFy37stwGA0dEBJEmFy37stwHwQyBJOcp+7LcBgFHRASRJhct+7LcBsAuUpBxlP/bbANgFSlKObACiA5RA9h8CScpQ9mO/DYAfAknKUfZjvw2AtwAkKUfZNwAd0QFKYDM2QpKUmy3A8OgQkZz4YH10AElS4dZFB4hmAwDvRAeQJBXu7egA0WwA4IXoAJKkwj0fHSCaDQAsjw4gSSrck9EBotkAwH3RASRJhbs3OkA0GwC4OTqAJKlw2Y/9PgaYLAfmRIeQJBXit6Qxvys6SCRXAJJ/ig4gSSrMD8l88gdXALaaCjwDjI0OIklqq/XAfsDL0UGiuQKQrAR+EB1CktR2V+DkD7gC0N0U4DfAxOggkqS2eAOYC6yKDlIGWZ+DvIP3gLeAM6ODSJLa4qvAndEhysIVgJ39FDg7OoQkqaWuBs6NDlEmNgA7mwDcARwaHUSS1BJLgQ/j+f/bsQHo2d6kJmB2dBBJ0pA8AywCXokOUjY+BdCzl4CFwMPRQSRJg/YocAJO/j2yAejdK8CJpD0BkqRquZr0Re7F6CBlZQPQt7eAzwBfBNYEZ5Ek9e8N4GLShj/v+ffBxwCb8wDw98A4YD4wIjaOJGkH64DvAufgo35NcRPgwO1F6i5/B9g/OIsk5e5J4ErSCX8rg7NUig3A0BwCnAwcDRwI7APs0ihJUuu826jngSeA+0iv9H08MlSV/X963F7/ag2RNgAAAABJRU5ErkJggg=="/>
      </defs>
    </svg>
  )
}


export const MoneyImage = () => {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.9999 9.89856C8.16156 9.89856 6.66657 8.59856 6.66657 7.00001C6.66657 5.40146 8.16156 4.10146 9.9999 4.10146C11.8382 4.10146 13.3332 5.40146 13.3332 7.00001C13.3332 8.59856 11.8382 9.89856 9.9999 9.89856ZM9.9999 5.55074C9.08073 5.55074 8.33323 6.20074 8.33323 7.00001C8.33323 7.79929 9.08073 8.44929 9.9999 8.44929C10.9191 8.44929 11.6666 7.79929 11.6666 7.00001C11.6666 6.20074 10.9191 5.55074 9.9999 5.55074ZM4.16657 3.37682C3.70657 3.37682 3.33323 3.70146 3.33323 4.10146C3.33323 4.50146 3.70657 4.8261 4.16657 4.8261C4.62657 4.8261 4.9999 4.50146 4.9999 4.10146C4.9999 3.70146 4.62657 3.37682 4.16657 3.37682ZM14.9999 5.55074C14.9999 5.95074 15.3732 6.27537 15.8332 6.27537C16.2932 6.27537 16.6666 5.95074 16.6666 5.55074C16.6666 5.15074 16.2932 4.8261 15.8332 4.8261C15.3732 4.8261 14.9999 5.15074 14.9999 5.55074ZM4.16657 7.72465C3.70657 7.72465 3.33323 8.04929 3.33323 8.44929C3.33323 8.84929 3.70657 9.17392 4.16657 9.17392C4.62657 9.17392 4.9999 8.84929 4.9999 8.44929C4.9999 8.04929 4.62657 7.72465 4.16657 7.72465ZM14.9999 9.89856C14.9999 10.2986 15.3732 10.6232 15.8332 10.6232C16.2932 10.6232 16.6666 10.2986 16.6666 9.89856C16.6666 9.49856 16.2932 9.17392 15.8332 9.17392C15.3732 9.17392 14.9999 9.49856 14.9999 9.89856ZM14.1657 13.5217C12.8041 13.5217 11.5841 13.2326 10.4049 12.9529C9.28157 12.6862 8.22157 12.4348 7.08323 12.4348C5.77407 12.4348 4.94823 12.508 4.23407 12.6877C3.22907 12.9391 2.1724 12.7696 1.33407 12.221C0.486566 11.6667 0.000732422 10.8203 0.000732422 9.89856V4.429C0.000732422 2.93407 1.08323 1.57103 2.6949 1.03697C3.8124 0.665953 4.86907 0.478271 5.8349 0.478271C7.19657 0.478271 8.41573 0.767402 9.59573 1.04711C10.7191 1.31378 11.7791 1.56523 12.9174 1.56523C14.2257 1.56523 15.0524 1.49204 15.7666 1.31233C16.7732 1.06088 17.8299 1.23045 18.6674 1.779C19.5149 2.33334 20.0007 3.17972 20.0007 4.10146V9.57103C20.0007 11.066 18.9174 12.429 17.3057 12.9631C16.1882 13.3341 15.1324 13.5217 14.1657 13.5217ZM7.08323 10.9855C8.4449 10.9855 9.66406 11.2746 10.8441 11.5544C11.9674 11.821 13.0274 12.0725 14.1657 12.0725C14.9274 12.0725 15.7841 11.9167 16.7124 11.6087C17.6982 11.2826 18.3341 10.4826 18.3341 9.57103V4.10146C18.3341 3.63987 18.0899 3.21523 17.6649 2.93769C17.2491 2.66595 16.7266 2.58045 16.2274 2.70508C15.3516 2.92465 14.3924 3.0145 12.9157 3.0145C11.5541 3.0145 10.3349 2.72537 9.1549 2.44566C8.03157 2.179 6.97157 1.92755 5.83323 1.92755C5.07073 1.92755 4.2149 2.08334 3.28657 2.39131C2.30073 2.7174 1.6649 3.5174 1.6649 4.429V9.89856C1.6649 10.3602 1.90907 10.7848 2.33407 11.0623C2.7499 11.3341 3.2724 11.4196 3.77073 11.2942C4.64657 11.0746 5.60656 10.9848 7.0824 10.9848L7.08323 10.9855Z" fill="#7950F2"/>
    </svg>
  )
}
