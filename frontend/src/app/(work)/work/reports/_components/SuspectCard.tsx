import { Button } from "@/components/Button"
import { color } from "@/config/theme"
import styled from "styled-components"

export const SuspectCard = ({steamId, userName, lastCheck, reportsCount}) => {
    return <Container>
        <Header>
            <li>Игрок: {userName}</li>
            <li>SteamID: {steamId}</li>
            <li>LastCheck: {lastCheck}</li>
            <li>Reports: {reportsCount}</li>
        </Header>
        <Footer>
            <StyledButton>CHECK</StyledButton>
            <StyledButton>Banned</StyledButton>
            <StyledButton>History</StyledButton>
        </Footer>
    </Container>
}


const Container = styled.div`
    background: ${color.secondary};
    padding: 12px;
    max-width: 300px;
    width: 100%;
`

const Header = styled.div`

`

const Footer = styled.div`
 display: flex;
 margin-top: 18px;
`

const StyledButton = styled(Button)`
    color: white;
    text-transform: uppercase;
    font-weight: 700;
 & + & {
    margin-left: 16px;
 }
`
