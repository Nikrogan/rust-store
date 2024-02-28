import '@mantine/core/styles.css';
import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google';
import styles from './page.module.css'
import { Container,  Image, MantineProvider } from '@mantine/core';
import { theme } from '@/components/theme/theme';
import { EffectorNext } from "@effector/next";
import { ReduxDevToolsAdapter } from '@/shared/devtools/devtools';
import { NavBar } from '@/components/NavBar';

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display:'swap',
  fallback: ['Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'BlackwoodRust',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <MantineProvider theme={theme}>
          <div className={styles.background}>
            <ReduxDevToolsAdapter />
              <EffectorNext>
                  <Container size='xl' style={{position: 'relative'}}>
                    <div className={styles.navContainer}>
                      <NavBar />
                    </div>
                  <main>
                    {children}
                  </main>
                  </Container>
              </EffectorNext>
              </div>
         </MantineProvider>
      </body>
    </html>
  )
}