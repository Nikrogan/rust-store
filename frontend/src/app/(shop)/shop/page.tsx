'use client';
import { Button, Card, Flex, MantineProvider, Image, Text, Group, Badge, Progress, Space, Title, Menu, Avatar, Grid, GridCol } from '@mantine/core';
import styles from './page.module.css'
import { theme } from '@/components/theme/theme';
import { ServerCard } from '@/components/ServerCard';

import { usePathname } from 'next/navigation';
import { UserAvatar } from '@/components/UserAvatar';
import { NavBar } from '@/components/NavBar';
import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';

export default function Home() {
  const [currentServer, setCurrentServer] = useState<number | null>(null)

  const handleChangeServer = (serverId: number | null) => {
    setCurrentServer(serverId)
  };

  return (
    <main className='main'>
      <MantineProvider theme={theme}>
        <NavBar />
        <Space h='xl'/>
        {!currentServer && (
        <>
          <Group justify="space-between" mt="xl" mb="md">
            <Title style={{ color: 'white' }} order={1}>Выберите свой сервер</Title>
          </Group>
          <Flex gap={theme?.spacing?.md}>
              <ServerCard buttonText="Выбрать" onClick={handleChangeServer} serverId={1} />
              <ServerCard buttonText="Выбрать" onClick={handleChangeServer} serverId={2} />
              <ServerCard buttonText="Выбрать" onClick={handleChangeServer} serverId={3} />
          </Flex>
        </>
        )}
        <Space h='xl'/>
        {currentServer && <Flex w='100%' justify='space-between'>
          <Space mt='sm' mr="sm">
          <Flex wrap='wrap' gap='md'>
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
          </Flex>
          </Space>
          <div style={{minWidth: '260px'}}>
            <Title style={{ color: 'white' }} order={2}>Выбранный сервер</Title>
            <Space h='md'/>
            <ServerCard  buttonText="Изменить" onClick={handleChangeServer} serverId={null} isShort/>
          </div>
        </Flex>}

      </MantineProvider>
    </main>
  )
}


/**
 * 
 *         <Flex gap={theme?.spacing?.md}>
          <ServerCard />
          <ServerCard />
          <ServerCard />
        </Flex>
 */