import '@mantine/core/styles.css';
import type { Metadata } from 'next'

import { Roboto_Condensed } from 'next/font/google';
import {  MantineProvider } from '@mantine/core';
import { theme } from '@/components/theme/theme';
import { EffectorNext } from "@effector/next";
import { ReduxDevToolsAdapter } from '@/shared/devtools/devtools';
import './globals.css'
import { MainPageServer } from '@/pag/mainServer';

const montserrat = Roboto_Condensed({
  weight: ['400', '700'],
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
            <ReduxDevToolsAdapter />
              <EffectorNext>
                <MainPageServer>{children}</MainPageServer>
              </EffectorNext>
         </MantineProvider>
      </body>
    </html>
  )
}