'use client';
import { Button, Card, Flex, MantineProvider, Image, Text, Group, Badge, Progress, Space } from '@mantine/core';
import styles from './page.module.css'
import { theme } from '@/components/theme/theme';
import { ServerCard } from '@/components/ServerCard';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <MantineProvider theme={theme}>
        <Flex gap={theme?.spacing?.md} className={styles.flex} justify='center'>
            <Link href="/shop" className={styles.buttonMain}>
              <Button className={styles.buttonMain} variant="outline" color="white" size="lg" fullWidth>
                Магазин
              </Button>
            </Link>
            <Button className={styles.buttonMain} variant="outline" color="white" size="lg" fullWidth>Новости</Button>
            <Button className={styles.buttonMain} variant="outline" color="white" size="lg" fullWidth>Календарь вайпов</Button>
        </Flex>
        <Space h='xl'/>
        <Flex gap={theme?.spacing?.md}>
          <ServerCard />
          <ServerCard />
          <ServerCard />
        </Flex>
      </MantineProvider>
    </main>
  )
}
