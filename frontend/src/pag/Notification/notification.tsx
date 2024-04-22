import { color } from "@/config/theme"
import styled from "styled-components"

export const Notification = ({children}) => {
    return <StyledNotification>{children}</StyledNotification>
}

const StyledNotification = styled.div`
    width: 170px;
    background: ${color.primary};
    padding: 4px 4px 4px 8px;
    position: relative;
    font-size: 16px;
    & + & {
        margin-top: 6px;
    }
    &:before {
        position: absolute;
        content: '';
        width: 2px;
        left: 4px;
        height: 22px;
        background: red;
    }
`