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
        
      </MantineProvider>
    </main>
  )
}
