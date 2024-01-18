'use client';
import { Group, MantineProvider} from '@mantine/core';
import { theme } from '@/components/theme/theme';
import { NavBar } from '@/components/NavBar';
import { ServerCard } from '@/components/ServerCard';
import { ModalNews } from '@/components/ModalNews';

export default function News() {

  return (
      <MantineProvider theme={theme}>
        Тест докера
        <Group justify='center' mt="xl">
         <ServerCard />
         <ServerCard />
         <ServerCard />
        </Group>
        <ModalNews />
      </MantineProvider>
  )
}
