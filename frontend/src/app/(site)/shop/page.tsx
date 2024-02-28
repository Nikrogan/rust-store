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
import { ShopFilters } from '@/components/ShopFilters';
import { ServerList } from '@/mock/serverList';

export default function Home() {
  const {products: {data, isLoading}, currentServer, changeServer} = useUnit({
    products: $products,
    currentServer: $currentServer,
    changeServer: changeServerEvent
  })

  const {colorScheme} = useMantineColorScheme();

  const ServerListView = ServerList.map((server) => {
    return <ServerCard key={server.serverId} onClick={() => changeServer(server)} buttonText="Выбрать" {...server}  />
  });

  const ProductListView = data.map((item) => {
    return <ProductCard key={item?.title} title={item?.title} price={item.price ? item.price : undefined} />
  });

  const ServerMonitoring = ServerList.map((server) => {
    return <Server key={server.serverId} currentServer={server} />
  });

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
        <Space mt='sm' mr="sm">
        {!!currentServer?.serverId && <Flex w='100%' justify='space-between'>
            <Flex>
              <ShopFilters />
            </Flex>
            <Flex className='shop__container' wrap='wrap' gap='md'>
              {ProductListView}
            </Flex>
        </Flex>}
        </Space>
        </Container>
  )
}