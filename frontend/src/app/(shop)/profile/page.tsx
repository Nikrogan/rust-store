'use client'
import { theme } from '@/components/theme/theme'
import styles from './page.module.css'
import { MantineProvider } from '@mantine/core'
import { NavBar } from '@/components/NavBar'

export default function Home() {
  return (
    <main className='main'>
      <MantineProvider theme={theme}>
        <NavBar />
      </MantineProvider>
    </main>
  )
}
