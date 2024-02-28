'use client';
import { Flex, MantineProvider, Group, Space, Title, Container, Box, Text, Progress, useMantineColorScheme } from '@mantine/core';
import { ServerCard } from '@/components/ServerCard';
import { ProductCard } from '@/components/ProductCard';
import "./page.css"
import { useUnit } from 'effector-react';
import { $currentServer, changeServerEvent } from '@/store/server';
import { $products } from './store';
import { Server } from '@/pageComponents/shop/server';
import { theme } from '@/components/theme/theme';


const ServerList = [
  {
    serverId: 1,
    title: '[BW] TRIO 3X',
    currentOnline: 1,
    maxOnline: 10,
    queue: 100,
    ip: 's1.bwrust.ru:11112',
    lastWipe: '22.01.2024',
    nextWipe: '26.01.2024'
  },
  {
    serverId: 2,
    title: '[BW] Unlimited Vanilla',
    currentOnline: 6,
    maxOnline: 10,
    queue: 21,
    ip: 's2.bwrust.ru:11112',
    lastWipe: '22.01.2024',
    nextWipe: '26.01.2024'
  },
  {
    serverId: 3,
    title: '[BW] 2X MAX5',
    currentOnline: 3,
    maxOnline: 10,
    queue: 51,
    ip: 's3.bwrust.ru:11112',
    lastWipe: '22.01.2024',
    nextWipe: '26.01.2024'
  },
  {
    serverId: 4,
    title: '[BW] Quad 5X',
    currentOnline: 3,
    maxOnline: 10,
    queue: 51,
    ip: 's3.bwrust.ru:11112',
    lastWipe: '22.01.2024',
    nextWipe: '26.01.2024'
  },
]

export default function Home() {
  const {products: {data, isLoading}, currentServer, changeServer} = useUnit({
    products: $products,
    currentServer: $currentServer,
    changeServer: changeServerEvent
  })

  const {colorScheme} = useMantineColorScheme();

  const ServerListView = ServerList.map((server) => {
    return <ServerCard key={server.serverId} onClick={() => changeServer(server)} buttonText="Выбрать" {...server}  />
  })

  const ProductListView = data.map((item) => {
    return <ProductCard key={item?.title} title={item?.title} price={item.price ? item.price : undefined} />
  })

  const ServerMonitoring = ServerList.map((server) => {
    return <Server key={server.serverId} currentServer={server} />
  })
  return (
        <Container size="xl" >
        {!currentServer && (
        <>
          <Group justify="center" mt="xl" mb="md" >
            <Title style={{ color: 'white' }} order={1}>Выберите свой сервер</Title>
          </Group>
          <Flex gap={theme?.spacing?.md} justify='center'>
              {ServerListView}
          </Flex>
        </>
        )}
        <Space h='xl'/>
        {!!currentServer && <Flex >
          <Box w={300} bg={colorScheme === 'dark' ? theme.colors?.dark?.[9] : theme.colors?.blue?.[0]} p={theme.spacing?.md} style={{borderRadius: theme.radius.xs}}>
              {ServerMonitoring}
          </Box>
        </Flex>}
        {!!currentServer?.serverId && <Flex w='100%' justify='space-between'>
          <Space mt='sm' mr="sm">
          <Flex className='shop__container' wrap='wrap' gap='md'>
              {ProductListView}
          </Flex>
          </Space>
        </Flex>}
        </Container>
  )
}