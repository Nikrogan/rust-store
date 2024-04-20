'use client'
import { redirect, usePathname } from "next/navigation";
import { Main } from "./MainS";
import { Container } from "@mantine/core";
import { NavBar } from "@/components/NavBar";
import styled from 'styled-components';
import { useLayoutEffect } from "react";
import { PromocodeModal } from "@/components/PromocodeModal/PromocodeModal";
import { BalancaModal } from "@/components/BalanceModal";

const Background = styled.div`
    background: ${() => "#0B0911" };
    min-height: 100vh;
`;

const Offer = styled.div`
    text-align: center;
    max-width: 1078px;
    margin: 36px auto 0;
`;

const StyledMain = styled.main`
    min-height: calc(100vh - 178px);
`;

export const MainPageServer = ({children}) => {
    const pathname = usePathname();
    
    useLayoutEffect(() => {
        const lastPage = localStorage.getItem('lastPage');
        if(lastPage) {
            localStorage.removeItem('lastPage')
            redirect(lastPage)
        }
    }, [])

    if(pathname === '/') {
        return <Main />
    }

    return (
        <Background>
            <Container size='xl' style={{position: 'relative'}}>
                <div>
                    <NavBar />
                </div>
                <StyledMain>
                    {children}
                </StyledMain>
                <Offer>
                    Размещенная на настоящем сайте информация носит исключительно информационный характер
                    и ни при каких условиях не является публичной офертой, определяемой положениями ч. 2 ст. 437 
                    Гражданского кодекса Российской Федерации.
                </Offer>
            </Container>
            <PromocodeModal /> 
            <BalancaModal />
        </Background>
    )
}