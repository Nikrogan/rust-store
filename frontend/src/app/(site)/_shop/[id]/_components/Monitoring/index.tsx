import { color } from "@/config/theme"
import { useState } from "react"
import styled from "styled-components"


const MockServer = [
    {
        title: '#1 BWRUST X3 MAX3',
        online: 100,
        maxOnline: 150,
        queque: 10,
        joining: 5,
        ip: 's1.bwrust.ru',
        limit: 3
    },
    {
        title: '#2 BWRUST Classic NOLIMIT',
        online: 58,
        maxOnline: 150,
        queque: 10,
        joining: 5,
        ip: 's1.bwrust.ru',
        limit: 0
    },
    {
        title: '#3 BWRUST X2 MAX5',
        online: 23,
        maxOnline: 150,
        queque: 10,
        joining: 5,
        ip: 's1.bwrust.ru',
        limit: 5
    },
    {
        title: '#4 BWRUST X5 MAX4',
        online: 149,
        maxOnline: 150,
        queque: 10,
        joining: 5,
        ip: 's1.bwrust.ru',
        limit: 4
    },
    {
        title: 'TOTAL',
        online: 331,
        maxOnline: 600,
        queque: 10,
        joining: 5,
        ip: 's1.bwrust.ru',
        limit: 4,
    },
]

export const Monitoring = () => {
    return <div>
        <Title>Мониторинг</Title>
        <ServerList>
            {MockServer.map((item) => {
                return <Server key={item.title}>
                    <ServerIcon>
                        <Icon/>
                        MAX{item.limit}
                    </ServerIcon>
                    <ServerContent>
                        <ServerTitle>{item.title}</ServerTitle>
                        <Status>
                            <CurrentStatus width={item.online / (item.maxOnline / 100)}/>
                        </Status>
                        <ServerFooter>
                        <ServerCurrentOnline>
                            <PlayerIcon />
                            &nbsp;{item.online}
                        </ServerCurrentOnline>
                        <ServerFooterButton>
                            <CopyButton onClick={() => {
                                navigator.clipboard.writeText(item.ip).then(() => {
                                    window.alert(`Ip ( ${item.ip} ) server succesful copy`)
                                })
                            }}>
                                <CopyIpIcon/>
                            </CopyButton>
                            <PlayButton href={`steam://run/252490//+connect ${item.ip}`}>
                                <ConnectIcon />
                            </PlayButton>
                            
                        </ServerFooterButton>
                        </ServerFooter>

                    </ServerContent>
                </Server>
            })}
        </ServerList>
    </div>
}


const ServerCurrentOnline = styled.div`
    display: flex;
    align-items: center;
`

const Status =  styled.div`
    background: ${color.thirdly};
    width: 100%;
    height: 18px;
    margin-top: 8px;
`

const CurrentStatus = styled.div`
    width: ${({width}) => width}%;
    height: 100%;
    background: ${color.doubleprimary}
`

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    font-size: 16p;
    text-transform: uppercase;
    font-weight: 800;
    width: 100%;
    background: ${color.secondary}
`


const ServerList = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 18px;
`

const ServerFooter = styled.div`
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
`

const ServerFooterButton = styled.div`
    display: flex;
`

const CopyButton = styled.button`
    padding: 8px 8px 6px;
    background: ${color.thirdly};
    margin-right: 8px;
`

const PlayButton = styled.a`
    padding: 8px 8px 6px;
    background: ${color.thirdly};
`

const Server = styled.div`
    display: flex;
    background: ${color.secondary};
    align-items: center;
    padding: 8px;
    & + & {
        margin-top: 12px
    }
`

const ServerIcon = styled.div`
    margin-right: 16px;
    width: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ServerContent = styled.div`
    width: 100%;
`

const ServerTitle = styled.div`

`

const Icon = () => {
    return (
        <svg width="35" height="20" viewBox="0 0 35 20" fill={color.accent} xmlns="http://www.w3.org/2000/svg"><path d="M28.4998 10C30.4327 10 32 8.43362 32 6.50054C32 4.56745 30.4327 3 28.4998 3C26.5673 3 25 4.56745 25 6.50054C25.0001 8.43362 26.5673 10 28.4998 10Z"></path><path d="M33.9749 13.9228C33.78 12.6823 32.812 10.9461 32.0793 10.1705C31.9828 10.0677 31.5514 10.044 31.4349 10.1205C30.5441 10.7008 29.4977 11.0424 28.3746 11.0424C27.2528 11.0424 26.2063 10.7008 25.3154 10.1205C25.1984 10.044 24.7676 10.0677 24.6711 10.1705C24.4663 10.3875 24.2428 10.6763 24.0249 11.0113C24.6144 12.1871 25.082 13.4361 25.2507 14.5117C25.4194 15.5899 25.3646 16.6107 25.0919 17.5413C26.0606 17.9125 27.2222 18.0754 28.3745 18.0754C31.3802 18.0754 34.4561 16.9715 33.9749 13.9228Z"></path><path d="M16.9993 10C19.761 10 22 7.76107 22 4.99958C22 2.23892 19.761 0 16.9993 0C14.2382 0 12 2.23892 12 4.99958C12 7.76107 14.2381 10 16.9993 10Z"></path><path d="M21.5878 10.1171C21.4702 9.99201 20.9363 9.96002 20.7911 10.0561C19.6865 10.7825 18.3902 11.2077 16.9995 11.2077C15.6099 11.2077 14.3129 10.7825 13.2089 10.0561C13.0638 9.95996 12.5298 9.99201 12.4122 10.1171C11.5023 11.0887 10.303 13.2607 10.0617 14.8091C9.46679 18.623 13.2784 20 16.9995 20C20.7216 20 24.5332 18.623 23.9383 14.8091C23.697 13.2607 22.4977 11.0887 21.5878 10.1171Z"></path><path d="M5.50027 10C7.43272 10 9 8.43362 9 6.50054C9 4.56745 7.43272 3 5.50027 3C3.56728 3 2 4.56745 2 6.50054C2 8.43362 3.56728 10 5.50027 10Z"></path><path d="M8.66294 14.5117C8.84464 13.3821 9.35729 12.052 10 10.8221C9.82086 10.5662 9.6418 10.3434 9.47651 10.1705C9.37874 10.0677 8.94233 10.044 8.82379 10.1205C7.92125 10.7008 6.8611 11.0424 5.7241 11.0424C4.58695 11.0424 3.52612 10.7008 2.62433 10.1205C2.50631 10.044 2.0687 10.0677 1.97093 10.1705C1.22675 10.9461 0.248646 12.6824 0.0505407 13.9229C-0.436293 16.9715 2.6792 18.0754 5.7241 18.0754C6.81074 18.0754 7.90807 17.9356 8.84464 17.6158C8.54951 16.6663 8.48704 15.6216 8.66294 14.5117Z"></path></svg>
    )
}

const PlayerIcon = () => {
    return (
        <svg width="14" height="20" viewBox="0 0 14 20" fill={color.accent} xmlns="http://www.w3.org/2000/svg"><path d="M6.99934 10C9.76099 10 12 7.76107 12 4.99958C12 2.23892 9.76099 0 6.99934 0C4.23817 0 2 2.23892 2 4.99958C2 7.76107 4.23812 10 6.99934 10Z"></path><path d="M11.5878 10.1171C11.4702 9.99201 10.9363 9.96002 10.7911 10.0561C9.68648 10.7825 8.39017 11.2077 6.99952 11.2077C5.60989 11.2077 4.31295 10.7825 3.2089 10.0561C3.06378 9.95996 2.52982 9.99201 2.41225 10.1171C1.50228 11.0887 0.302977 13.2607 0.0616969 14.8091C-0.53321 18.623 3.27842 20 6.99952 20C10.7216 20 14.5332 18.623 13.9383 14.8091C13.697 13.2607 12.4977 11.0887 11.5878 10.1171Z"></path></svg>
    )
}

const CopyIpIcon = () => {
return (
    <svg width="15" height="14" viewBox="0 0 15 14" fill={color.accent} xmlns="http://www.w3.org/2000/svg"><path d="M13.0309 0H5.25156C4.69712 0 4.24609 0.4487 4.24609 1.00021V3.34776C4.4598 3.34776 8.65388 3.34776 8.82132 3.34776C9.88186 3.34776 10.7447 4.20606 10.7447 5.26105C10.7447 5.45854 10.7447 9.68903 10.7447 9.73919H13.0309C13.5854 9.73919 14.0364 9.29049 14.0364 8.73895V1.00021C14.0364 0.4487 13.5854 0 13.0309 0Z"></path><path d="M8.82147 4.2608H1.04212C0.48771 4.2608 0.0366211 4.7095 0.0366211 5.26104V12.9998C0.0366517 13.5513 0.487679 14 1.04212 14H8.8215C9.37594 14 9.827 13.5513 9.827 12.9998V5.26104C9.82703 4.7095 9.37591 4.2608 8.82147 4.2608Z"></path></svg>
)
}

const ConnectIcon = () => {
    return (
        <svg width="13" height="16" viewBox="0 0 13 16" fill={color.accent} xmlns="http://www.w3.org/2000/svg"><path d="M12.0421 6.51426L2.42703 0.429993C1.98299 0.148814 1.53559 0 1.1637 0C0.444744 0 0 0.533346 0 1.4261V14.576C0 15.4677 0.444183 16 1.16146 16C1.5339 16 1.97416 15.8511 2.41919 15.5691L12.0388 9.48496C12.6574 9.09305 13 8.56566 13 7.99929C13.0001 7.4333 12.6615 6.90604 12.0421 6.51426Z"></path></svg>
    )
}