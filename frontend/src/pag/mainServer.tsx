'use client'
import { redirect, usePathname } from "next/navigation";
import { Main } from "./MainS";
import { NavBar } from "@/components/NavBar";
import styled from 'styled-components';
import { useLayoutEffect } from "react";
import { PromocodeModal, store as promoStore } from "@/components/PromocodeModal/PromocodeModal";
import { BalanceModal } from "@/components/BalanceModal";
import { useUnit } from "effector-react";
import { $NotificationList } from "@/components/roullete/store";
import { Notification } from "./Notification/notification";
import { changeLangEvent } from "@/store/lang";
import { Shop } from "@/app/(site)/_shop/page";

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
    min-height: calc(100vh - 100px);
    padding-top: 64px;
`;

export const MainPageServer = ({children}) => {
    const pathname = usePathname();
    const NotificationData = useUnit($NotificationList);
    const promoStoresModal = useUnit(promoStore)
    const changeLang = useUnit(changeLangEvent);
    
    useLayoutEffect(() => {
        const lastPage = localStorage.getItem('lastPage');
        changeLang(navigator.language === 'ru' ? 'RU' : 'EN')
        if(lastPage) {
            localStorage.removeItem('lastPage')
            redirect(lastPage)
        }
    }, [])

    const NotificationListView = NotificationData.map((item, i) => {
        return <Notification key={item + i}>{item}</Notification>
    })

    return (
        <Background>
            <Container>
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
            <BalanceModal />
            <NotificationList>
                <div>
                    {NotificationListView}
                </div>

            </NotificationList>
            {promoStoresModal.isOpen &&  <PromocodeModal /> }
        </Background>
    )
}

const NotificationList = styled.div`
    position: absolute;
    z-index: 999999;
    top: 24px;
    display: flex;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
`

const Container = styled.div`
    margin: 0 auto;
    padding: 0 64px;
    position: relative;
`