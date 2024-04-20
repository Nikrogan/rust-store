import styled from "styled-components"


const StyledButton = styled.button`
    padding: 10px;
    background: #0B0911;
    display: flex;
    align-items: center;
    font-size: 13px;
    width: ${({ width }) => width ? width : 'auto' };
    justify-content: ${({position}) => position ? position : 'auto'};
    transition: transform 0.4s;

    &:hover {
        transform: scale(1.01);
    }
`

const StyledRightElement = styled.div`
    margin-left: 12px;
`

export const Button = ({children, onClick, RightElement, ...rest}) => {
    return <StyledButton onClick={onClick} {...rest}>
        {children}
        {RightElement && (
            <StyledRightElement>
                <RightElement/>
            </StyledRightElement>
        )
        }
    </StyledButton>
}