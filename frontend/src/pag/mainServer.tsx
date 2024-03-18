import { usePathname } from "next/navigation";
import { Main } from "./MainS";
import { Container } from "@mantine/core";
import { NavBar } from "@/components/NavBar";
import styles from './page.module.css'

export const MainPageServer = ({children}) => {
    const pathname = usePathname();

    if(pathname === '/') {
        return <Main />
    }

    return (
        <div className={styles.background}>
            <Container size='xl' style={{position: 'relative'}}>
                <div className={styles.navContainer}>
                <NavBar />
                </div>
                <main>
                    {children}
                </main>
            </Container> 
        </div>
    )
}