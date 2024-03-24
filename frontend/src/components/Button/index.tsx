import styled from "styled-components"


const StyledButton = styled.button`
    padding: 10px;
    background: #0B0911;
    display: flex;
    align-items: center;
    font-size: 13px;
`

const StyledRightElement = styled.div`
    margin-left: 12px;
`

export const Button = ({children, onClick, RightElement}) => {
    return <StyledButton onClick={onClick}>
        {children}
        {RightElement && (
            <StyledRightElement>
                <RightElement/>
            </StyledRightElement>
        )
        }
    </StyledButton>
}