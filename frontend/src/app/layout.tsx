import './global.css'
import StyledComponentsRegistry from "@/lib/registry"
import { Roboto} from 'next/font/google';


const montserrat = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display:'auto',
  fallback: ['Arial', 'sans-serif'],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={montserrat.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}