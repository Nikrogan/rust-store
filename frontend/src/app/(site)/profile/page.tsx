'use client'
import { theme } from '@/components/theme/theme'
import styles from './page.module.css'
import { Box, Button, Flex, Image, MantineProvider, Table, Tabs, TabsList, TabsPanel, Text, Title } from '@mantine/core'
import { NavBar } from '@/components/NavBar'
import { useUnit } from 'effector-react'
import { $userStores, logoutEvent } from '@/store/auth'
import { useRouter } from "next/navigation";


const promocodesTableData = {
  head: ['Дата', 'Промокод', 'Сумма'],
  body: [],
}

const historyBalanceTableData = {
  head: ['Дата', 'Операция', 'Сумма', 'Платежная система'],
  body: [],
}

export default function Home() {
  const router = useRouter()
  const {isAuth, user} = useUnit($userStores)
  const onLogout = useUnit(logoutEvent)
  console.log(user)
  if(!isAuth) {
    router.replace('/')
  }

  return (
    <main>
      <MantineProvider theme={theme}>
        <Flex justify="start" w="100%" mt={24}>
          <Title>Профиль</Title>
        </Flex>
        <Box bg={'rgb(48 61 89 / 56%)'}>
        <Flex justify="space-between" align='center' mt={40}>
          <Box>
            <Flex align='center'>
            <Image src={user?.avatarUrl} w={100} h={100} radius={theme.radius?.sm} />
            <Flex direction="column" ml='md'>
              <Text>{user?.displayName}</Text>
              <Text>Steam ID: {user?.steamId}</Text>
            </Flex>
            </Flex>
          </Box>
            <Button bg="red" type="button" variant="outline" onClick={onLogout}>Выйти</Button>
        </Flex>
        <Tabs>
          <TabsList>
            <Tabs.Tab value="inventory">
              Инвентарь
            </Tabs.Tab>
            <Tabs.Tab value="historyBalance">
              История баланса
            </Tabs.Tab>
            <Tabs.Tab value="promocodes">
              Промокоды
            </Tabs.Tab>
            <Tabs.Tab value="individualOffers">
              Личные предложения
            </Tabs.Tab>
          </TabsList>
          <TabsPanel value="inventory">
            Инвентарь
          </TabsPanel>
          <TabsPanel value="historyBalance">
            <Table data={historyBalanceTableData}/>
          </TabsPanel>
          <TabsPanel value="promocodes">
          <Table data={promocodesTableData}/>
          </TabsPanel>
          <TabsPanel value="individualOffers">
            Личные предложения
          </TabsPanel>
        </Tabs>
        </Box>
      </MantineProvider>
    </main>
  )
}
