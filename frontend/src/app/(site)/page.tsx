'use client';
import { MantineProvider} from '@mantine/core';
import { theme } from '@/components/theme/theme';
import { NavBar } from '@/components/NavBar';

export default function News() {

  return (
      <MantineProvider theme={theme}>
      </MantineProvider>
  )
}
