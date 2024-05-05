import type { Metadata } from 'next'

import { EffectorNext } from "@effector/next";
import { MainPageServer } from '@/pag/mainServer';


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
      <body>
            <EffectorNext>
                <MainPageServer>{children}</MainPageServer>
            </EffectorNext>
      </body>
    </html>
  )
}